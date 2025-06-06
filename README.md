# CV Ranking App

A desktop application built using Electron and React (via Vite).

## 🚀 Install & Run

```bash
# Clone the repository
git clone <(https://github.com/hahung200903/PBL7.git)>
cd cv-ranking-app

# Install root dependencies (Electron, concurrently, etc.)
npm install

# Install React (frontend) dependencies
cd client
npm install
cd ..

# Install Python 3.11 and set up backend virtual environment
cd python-backend
<path-to-python311> -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd ..

# Start the app (Electron + Vite React)
npm run dev
```
