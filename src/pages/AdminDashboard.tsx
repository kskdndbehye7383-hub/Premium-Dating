import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Database, LogOut, CheckCircle, AlertTriangle } from "lucide-react";

export default function AdminDatabase() {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [errorLines, setErrorLines] = useState<number[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Simple protection for admin route
    if (localStorage.getItem("spark_admin") !== "true") {
      navigate("/login", { replace: true });
      return;
    }

    // Load existing CC numbers from backend API
    fetch('/api/cards')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setInputText(data.join("\n"));
        }
      })
      .catch(err => {
        console.error("Failed to load CC numbers from backend", err);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("spark_admin");
    navigate("/login", { replace: true });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setInputText(text);
    setSuccessMessage("");
    
    if (text.trim() === "") {
      setErrorLines([]);
      return;
    }

    const lines = text.split("\n");
    const errors: number[] = [];

    lines.forEach((line, index) => {
      // Ignore completely empty lines but check lines with content
      if (line.trim() !== "") {
        const hasOnlyDigits = /^\d+$/.test(line.trim());
        if (!hasOnlyDigits || line.trim().length !== 16) {
          errors.push(index);
        }
      }
    });

    setErrorLines(errors);
  };

  const handleSave = () => {
    if (errorLines.length > 0) {
      alert("Please fix the validation errors before saving.");
      return;
    }

    // Identify valid numbers or clear entire database if empty
    let validLines: string[] = [];
    if (inputText.trim() !== "") {
      validLines = inputText
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "" && /^\d{16}$/.test(l));
    }

    // Save to real node backend API
    fetch('/api/cards', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cards: validLines })
    })
    .then(res => res.json())
    .then(data => {
       if (data.success) {
         setSuccessMessage(validLines.length === 0 ? "Successfully cleared database!" : "Successfully saved to database!");
         setTimeout(() => setSuccessMessage(""), 3000);
       } else {
         alert("Failed to save to database");
       }
    })
    .catch(err => {
      console.error(err);
      alert("Connection error while saving");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold tracking-widest uppercase text-rose-500">Spark Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button className="flex items-center w-full p-3 rounded-lg transition-colors bg-rose-500/10 text-rose-500 font-medium">
            <span className="mr-3"><Database size={20} /></span>
            Database Injection
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 p-8">
         <div className="max-w-4xl w-full mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Database Entry</h1>
              <p className="text-gray-500 mt-2">Enter 16-digit card numbers. Each number must be on a new line.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-gray-100 rounded-md text-xs font-mono text-gray-500 border border-gray-200">
                    Lines: {inputText.split('\n').length}
                  </div>
                  {errorLines.length > 0 && (
                     <div className="flex items-center text-xs text-red-500 font-medium bg-red-50 px-3 py-1 rounded-md border border-red-100">
                        <AlertTriangle size={14} className="mr-1.5" />
                        {errorLines.length} Invalid line(s) detected
                     </div>
                  )}
                </div>
                <button
                  onClick={handleSave}
                  disabled={errorLines.length > 0}
                  className="px-6 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Save to Database
                </button>
              </div>

              {/* Editor */}
              <div className="relative flex-1 min-h-[500px] flex">
                {/* Line Numbers with Error Markers */}
                <div className="w-14 bg-gray-50 py-4 border-r border-gray-100 flex flex-col text-right pr-3 pt-[17px] font-mono text-[14px] leading-relaxed text-gray-400 select-none overflow-hidden shrink-0">
                  {inputText.split('\n').map((_, i) => (
                    <div key={i} className={`h-[24px] flex items-center justify-end ${errorLines.includes(i) ? 'text-red-500 font-bold' : ''}`}>
                      {errorLines.includes(i) ? '!' : ''}{i + 1}
                    </div>
                  ))}
                </div>
                
                {/* Text Area */}
                <textarea
                  value={inputText}
                  onChange={handleTextChange}
                  className="w-full flex-1 p-4 font-mono text-[14px] leading-[24px] outline-none resize-none whitespace-pre overflow-auto"
                  placeholder="1234567812345678&#10;8765432187654321"
                  spellCheck={false}
                />
              </div>

              {/* Success Notification */}
              {successMessage && (
                <div className="absolute top-8 right-8 bg-green-50 text-green-700 px-6 py-4 rounded-xl shadow-lg border border-green-200 flex items-center animate-in slide-in-from-top-4 fade-in">
                  <CheckCircle className="mr-3" size={20} />
                  <span className="font-medium">{successMessage}</span>
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 font-medium">
              <strong className="mr-2 text-blue-900">Validation Rules:</strong> 
              Every line must contain exactly 16 numeric digits. Lines containing fewer, more, or non-numeric characters will block saving.
            </div>
         </div>
      </div>
    </div>
  );
}
