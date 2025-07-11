# .cursor/scratchpad.md

# Background and Motivation
The goal is to connect the frontend (HTML/JS in /static) with the FastAPI backend (app.py) so that users can submit a case description and optional PDF, and receive a generated legal report. The backend endpoint is /generate-report/ and the frontend currently posts to a different endpoint. The integration should provide a seamless user experience for submitting cases and viewing results.

**NEW TASK**: Implement stagewise toolbar integration for AI-powered editing capabilities in the React application.

# Key Challenges and Analysis
- The frontend form currently posts to /api/case/input, but the backend expects /generate-report/.
- The backend returns a detailed report, but the frontend expects a summary and questions, which may not match the backend output format.
- Need to handle file uploads (PDF) and text input in the frontend JS.
- Need to display the backend's report result in the frontend, possibly adapting the UI to match the backend's output structure.
- Ensure CORS/static file serving is correct for local development.

**NEW CHALLENGES**:
- Need to identify the correct stagewise packages for React/Vite project
- Ensure toolbar only appears in development mode
- Integrate toolbar into the top-most component (App.tsx)
- Add stagewise extension to recommended extensions list

# High-level Task Breakdown
- [ ] 1. Update frontend JS to POST to /generate-report/ instead of /api/case/input.
    - Success: Form data (case_description, file) is sent to the correct backend endpoint.
- [ ] 2. Adapt frontend JS to handle the backend's response format (report_result: likely a dict with keys like title, citation, summary, etc.).
    - Success: The report is displayed in the frontend after submission.
- [ ] 3. Update the frontend UI to show all relevant fields from the backend report (title, citation, summary, relevant laws, relevant cases, arguments, conclusion, recommendations).
    - Success: All report fields are visible and readable in the UI.
- [ ] 4. (Optional) Add error handling in the frontend for backend errors (e.g., display error messages).
    - Success: User sees a clear error message if the backend returns an error.
- [ ] 5. (Optional) Ensure static file serving works and test the full flow locally.

**NEW TASKS FOR STAGEWISE INTEGRATION**:
- [ ] 6. Install stagewise packages for React project
    - Success: @stagewise/toolbar-react and @stagewise-plugins/react are installed
- [ ] 7. Integrate StagewiseToolbar component into App.tsx
    - Success: Toolbar appears in development mode only
- [ ] 8. Create or update extensions.json with stagewise extension
    - Success: stagewise.stagewise-vscode-extension is in recommended extensions

# Project Status Board
- [x] 1. Update frontend JS to POST to /generate-report/ instead of /api/case/input.
- [x] 2. Adapt frontend JS to handle the backend's response format.
- [x] 3. Update the frontend UI to show all relevant fields from the backend report.
- [ ] 4. (Optional) Add error handling in the frontend for backend errors.
- [ ] 5. (Optional) Ensure static file serving works and test the full flow locally.
- [x] 6. Install stagewise packages for React project
- [x] 7. Integrate StagewiseToolbar component into App.tsx
- [x] 8. Create or update extensions.json with stagewise extension

# Executor's Feedback or Assistance Requests
- The frontend UI now displays each report field (title, citation, summary, relevant laws, relevant cases, arguments, conclusion, recommendations) clearly. Ready for user review or to proceed with optional error handling and testing.
- app.py now mounts the /static directory and enables CORS for local development, ensuring frontend-backend integration works smoothly.
- **STAGEWISE INTEGRATION COMPLETED**: Successfully installed @stagewise/toolbar-react and @stagewise-plugins/react packages. Integrated StagewiseToolbar component into App.tsx with ReactPlugin configuration. Created extensions.json with stagewise VSCode extension recommendation. No linting errors detected. Ready for user testing in development mode.

# Lessons
- Always check that frontend and backend endpoint URLs and response formats match.
- Read the backend response structure before updating the frontend display logic.