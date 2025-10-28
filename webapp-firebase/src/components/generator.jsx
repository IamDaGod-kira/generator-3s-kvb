import React, { useState, useEffect } from "react";
import { auth, db } from "../main";
import { doc, getDocs, collection, query, where, updateDoc } from "firebase/firestore";

export default function Generator() {
  const [loading, setLoading] = useState(true);
  const [studentDocId, setStudentDocId] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error("No logged-in user found.");
          setLoading(false);
          return;
        }

        const q = query(collection(db, "students"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setStudentData(docSnap.data());
          setStudentDocId(docSnap.id); // last 4 digits of uniqueid
        } else {
          console.error("No student record found for this user.");
        }
      } catch (err) {
        console.error("Error fetching student:", err);
      }
      setLoading(false);
    };

    fetchStudent();
  }, []);

  const generateSchedule = async () => {
    if (!studentData || !studentData.class) {
      return alert("Class not found in your profile.");
    }

    setGenerating(true);
    try {
      const classLevel = studentData.class;
      const subjects = ["english", "maths", "science", "sst"];
      const syllabusData = [];

      for (const subj of subjects) {
        const pdfUrl = `https://raw.githubusercontent.com/IamDaGod-kira/generator-3s-kvb/master/pdf/class9-10/syllabus/${subj}/class-${classLevel}.pdf`;

        const res = await fetch(pdfUrl);
        if (!res.ok) {
          console.warn(`No syllabus found for ${subj}`);
          continue;
        }

        // For now, we don’t parse the PDF content — just mock that it’s included
        syllabusData.push({ subject: subj, content: `Syllabus for ${subj}` });
      }

      if (syllabusData.length === 0) {
        alert("No syllabus files found for your class.");
        setGenerating(false);
        return;
      }

      const aiRes = await fetch(import.meta.env.VITE_AIAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an academic planner. Create a detailed study schedule for a Class ${classLevel} student using this syllabus data: ${JSON.stringify(
            syllabusData
          )}. Include daily study hours per subject, mock tests, and practice days to complete the full syllabus before the academic session ends.`,
        }),
      });

      const data = await aiRes.json();
      const generatedSchedule = data.schedule || [];

      setSchedule(generatedSchedule);

      // Save the schedule to the student’s Firestore document
      if (studentDocId) {
        await updateDoc(doc(db, "students", studentDocId), {
          syllabus: generatedSchedule,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      console.error("Error generating schedule:", err);
      alert("Failed to generate schedule. Please try again later.");
    }
    setGenerating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Fetching your details...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-10 bg-gradient-to-r from-[#d3f3ff]/40 to-[#fff0a5]/40 rounded-xl shadow-md">
      <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-6 text-center">
        Smart Study Schedule Generator
      </h1>

      <button
        onClick={generateSchedule}
        disabled={generating}
        className={`px-6 py-3 text-white font-semibold rounded-lg shadow-md transition ${
          generating
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {generating
          ? "Generating your schedule..."
          : `Generate Schedule for Class ${studentData?.class}`}
      </button>

      {schedule && schedule.length > 0 && (
        <div className="mt-8 w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Generated Study Schedule
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead className="bg-blue-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Hours/Day</th>
                <th className="border border-gray-300 px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, i) => (
                <tr
                  key={i}
                  className="text-center hover:bg-blue-50 transition-colors"
                >
                  <td className="border border-gray-300 px-4 py-2 capitalize">
                    {item.subject || `Subject ${i + 1}`}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.hoursPerDay || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.notes || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
