import { getPhishingAttempts, sendPhishingEmail } from "@api/api.service.ts";
import { useEffect, useState } from "react";

interface PhishingAttempt {
  email: string;
  status: string;
}

function Phishing() {
  const [email, setEmail] = useState("");
  const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      const { data } = await getPhishingAttempts();
      setAttempts(data);
    };

    fetchAttempts();
  }, []);

  const handleSendEmail = async () => {
    await sendPhishingEmail(email);
    // TODO: refetch to show new data.

    alert("Phishing email sent");
  };

  return (
    <div>
      <h2>Phishing Simulation</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={handleSendEmail}>Send Phishing Email</button>

      <h3>Phishing Attempts</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((attempt, index) => (
            <tr key={`${attempt.email}-${attempt.status}-${index}`}>
              <td>{attempt.email}</td>
              <td>{attempt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Phishing;
