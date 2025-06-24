document.getElementById("caseForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("case_description", document.getElementById("case_description").value);
    const fileInput = document.getElementById("file");
    if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }

    const response = await fetch("/api/case/input", {
        method: "POST",
        body: formData
    });
    const data = await response.json();

    // Display results
    document.getElementById("summary").value = data.summary;
    const questionsList = document.getElementById("questions");
    questionsList.innerHTML = "";
    data.questions.forEach(q => {
        const li = document.createElement("li");
        li.textContent = q;
        questionsList.appendChild(li);
    });
    document.getElementById("result").style.display = "block";

    // Store case ID for updates
    window.currentCaseId = data.case_id;
});

async function updateSummary() {
    const updatedSummary = document.getElementById("summary").value;
    const response = await fetch(`/api/case/${window.currentCaseId}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `updated_summary=${encodeURIComponent(updatedSummary)}`
    });
    const data = await response.json();
    alert(data.message || data.error);
} 
