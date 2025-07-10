document.getElementById("caseForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("case_description", document.getElementById("case_description").value);
    const fileInput = document.getElementById("file");
    if (fileInput.files.length > 0) {
        formData.append("file", fileInput.files[0]);
    }

    const response = await fetch("/generate-report/", {
        method: "POST",
        body: formData
    });
    const data = await response.json();

    // Display results
    document.getElementById("result").style.display = "block";
    // Clear previous error
    document.getElementById("report-error").textContent = "";

    if (data.error) {
        document.getElementById("report-error").textContent = "Error: " + data.error;
        // Clear all fields
        ["title","citation","summary","relevant_laws","relevant_case","Winning Arguments","Losing Arguments","Conclusion","Recommendations"].forEach(key => {
            const el = document.getElementById("report-" + key.replace(/ |_/g, "-").toLowerCase());
            if (el) el.textContent = "";
        });
        return;
    }

    // Helper to set field
    function setField(id, value) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = convertToHTML(value || "");
    }
    setField("report-title", data.title);
    setField("report-citation", data.citation);
    setField("report-summary", data.summary);
    setField("report-laws", data.relevant_laws);
    setField("report-cases", data.relevant_case);
    setField("report-winning", data["Winning Arguments"]);
    setField("report-losing", data["Losing Arguments"]);
    setField("report-conclusion", data.Conclusion);
    setField("report-recommendations", data.Recommendations);

    // Store case ID for updates
    window.currentCaseId = data.case_id;
});
function convertToHTML(text) {
    if (!text) return "";

    // Bold (**bold**) and italic (*italic*)
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Bullet points (* something)
    const lines = text.split("\n");
    let html = "";
    let inList = false;

    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith("* ")) {
            if (!inList) {
                html += "<ul>";
                inList = true;
            }
            html += `<li>${trimmed.slice(2)}</li>`;
        } else if (trimmed.length === 0) {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += "<br>";
        } else {
            if (inList) {
                html += "</ul>";
                inList = false;
            }
            html += `<p>${trimmed}</p>`;
        }
    }

    if (inList) html += "</ul>";
    return html;
}

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
