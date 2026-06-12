import { auth } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging.js";
import { messaging } from "./firebase.js";

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// AUTH CHECK
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "index.html";
    } else {
        // ONLY run notifications AFTER login is confirmed
        enableNotifications();
    }
});
async function enableNotifications() {
  try {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY_HERE"
      });

      console.log("FCM Token:", token);
      alert("Notifications enabled!");
    }
  } catch (error) {
    console.error(error);
  }
}

enableNotifications();
function save() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

// ADD ASSIGNMENT
window.addAssignment = function () {
    const title = document.getElementById("title").value;
    const deadline = document.getElementById("deadline").value;
    const sections = document.getElementById("sections").value
        .split(",")
        .map(s => ({
            name: s.trim(),
            done: false
        }));

    assignments.push({
        title,
        deadline,
        sections
    });

    save();
    render();
};

// TOGGLE SECTION
window.toggleSection = function (aIndex, sIndex) {
    assignments[aIndex].sections[sIndex].done =
        !assignments[aIndex].sections[sIndex].done;

    save();
    render();
};

// DELETE ASSIGNMENT
window.deleteAssignment = function (index) {
    assignments.splice(index, 1);
    save();
    render();
};

// PROGRESS CALCULATION
function progress(a) {
    const done = a.sections.filter(s => s.done).length;
    return Math.round((done / a.sections.length) * 100);
}

// NOTIFICATIONS
function checkDeadlines() {
    const today = new Date().toISOString().split("T")[0];

    assignments.forEach(a => {
        if (a.deadline === today) {
            if (Notification.permission === "granted") {
                new Notification("⏰ Deadline today!", {
                    body: a.title
                });
            }
        }
    });
}

setInterval(checkDeadlines, 60000);

// RENDER UI
function render() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    assignments.forEach((a, i) => {
        list.innerHTML += `
        <div class="card">
            <h3>${a.title}</h3>
            <p>📅 ${a.deadline}</p>

            <p>Progress: ${progress(a)}%</p>

            <div>
                ${a.sections.map((s, j) => `
                    <div>
                        <input type="checkbox" ${s.done ? "checked" : ""}
                        onclick="toggleSection(${i},${j})">
                        ${s.name}
                    </div>
                `).join("")}
            </div>

            <button onclick="deleteAssignment(${i})">Delete</button>
        </div>
        `;
    });
}

render();

// Ask notification permission
if ("Notification" in window) {
    Notification.requestPermission();
}
