import React, { useState } from "react";

export default function Generator() {
  const [selectedClass, setSelectedClass] = useState("9");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subjects = ["english", "maths", "science", "sst"];

  const handleGenerateAll = async () => {
    setError("");
    setResults([]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_AIAPI;
      if (!apiKey) throw new Error("Missing AI API key in .env file.");

      const newResults = [];

      for (const subject of subjects) {
        try {
          const pdfUrl = `https://raw.githubusercontent.com/IamDaGod-kira/generator-3s-kvb/master/pdf/class9-10/syllabus/${subject}/class-${selectedClass}.pdf`;

          const response = await fetch(pdfUrl);
          if (!response.ok)
            throw new Error(`Failed to fetch ${subject} syllabus.`);

          const blob = await response.blob();
          const text = await blob.text();

          const prompt = `You are an expert academic planner. Generate a 7-day study schedule for the subject "${subject}" using the following syllabus content:\n\n${text}\n\nReturn only valid JSON (an array of objects) with these keys: "Day", "Topic", "Hours", "Activity". Do NOT include any explanation or extra text.`;

          const aiResponse = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": apiKey,
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [{ text: prompt }],
                  },
                ],
              }),
            },
          );

          const data = await aiResponse.json();
          const aiText =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";

          let parsed = null;
          try {
            // Attempt to extract JSON even if AI includes markdown formatting
            const jsonMatch = aiText.match(/\[.*\]|\{.*\}/s);
            parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(aiText);
          } catch {
            parsed = null;
          }

          newResults.push({
            subject,
            raw: aiText || "No response from AI.",
            schedule: parsed,
          });
        } catch (subjectErr) {
          console.error(subjectErr);
          newResults.push({
            subject,
            raw: `Error: ${subjectErr.message}`,
            schedule: null,
          });
        }
      }

      setResults(newResults);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Smart Study Schedule Generator
      </h2>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">Select Class:</label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded p-2"
        >
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>

        <button
          onClick={handleGenerateAll}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate All Schedules"}
        </button>
      </div>

      {error && <p className="text-red-500 font-medium">{error}</p>}

      {results.length > 0 && (
        <div className="space-y-6">
          {results.map((res, idx) => (
            <div key={idx} className="p-4 bg-white rounded shadow">
              <h3 className="text-lg font-semibold mb-2 capitalize text-blue-800">
                {res.subject}
              </h3>

              {res.schedule ? (
                <table className="w-full border border-gray-300 text-sm rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Day</th>
                      <th className="border p-2">Topic</th>
                      <th className="border p-2">Hours</th>
                      <th className="border p-2">Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {res.schedule.map((row, i) => (
                      <tr key={i} className="text-center">
                        <td className="border p-2">{row.Day}</td>
                        <td className="border p-2">{row.Topic}</td>
                        <td className="border p-2">{row.Hours}</td>
                        <td className="border p-2">{row.Activity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <pre className="whitespace-pre-wrap text-gray-700 text-sm mt-2 bg-gray-50 p-3 rounded">
                  {res.raw}
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
