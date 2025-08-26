import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function StartPage({ onProceed }) {
  const [discord, setDiscord] = useState("");
  const [minecraft, setMinecraft] = useState("");

  const handleStart = (e) => {
    e.preventDefault();
    if (discord === "60632917" || minecraft === "60632917") {
      onProceed("admin");
      return;
    }
    if (!discord || !minecraft) {
      alert("Bitte Discord- und Minecraft-Namen eingeben.");
      return;
    }
    onProceed("apply", { discord, minecraft });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-200 to-sky-300 p-6">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl p-6">
        <CardContent className="space-y-4">
          <h1 className="text-3xl font-bold text-center">Minecraft Server – Bewerbung</h1>
          <p className="text-center text-gray-700">
            Bitte gib deinen <b>Discord-Namen</b> und <b>Minecraft-Namen</b> ein.
          </p>
          <form onSubmit={handleStart} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Discord-Name</label>
              <input
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="z.B. MeinDiscordName"
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Minecraft-Name</label>
              <input
                type="text"
                value={minecraft}
                onChange={(e) => setMinecraft(e.target.value)}
                placeholder="Dein In-Game-Name"
                className="w-full border p-2 rounded"
              />
            </div>
            <Button type="submit" className="w-full">Weiter</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ApplicationForm({ initialData, onSubmitted }) {
  const [reason, setReason] = useState("");
  const [builds, setBuilds] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const handleFiles = (e, setter) => {
    const files = Array.from(e.target.files || []);
    setter(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const app = {
      id: Date.now(),
      name: initialData.minecraft || "Unbekannt",
      discord: initialData.discord || "Unbekannt",
      reason,
      builds: builds.map((f) => URL.createObjectURL(f)),
      vehicles: vehicles.map((f) => URL.createObjectURL(f)),
      status: "offen",
    };
    onSubmitted(app);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-blue-300 p-6">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl p-6">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-4">Bewerbungsformular</h2>
          <p className="text-center text-sm mb-6 text-gray-600">
            Angemeldet als <b>{initialData.minecraft}</b> (Discord: {initialData.discord})
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Warum möchtest du Builder werden?</label>
              <textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} required className="w-full border p-2 rounded" placeholder="Kurz deine Motivation beschreiben..." />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Bilder von Bauwerken hochladen</label>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, setBuilds)} className="w-full border p-2 rounded" />
              {!!builds.length && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {builds.map((f, i) => (
                    <img key={i} src={URL.createObjectURL(f)} alt="Bauwerk" className="h-20 w-20 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="block mb-2 font-semibold">Bilder von Fahrzeugen hochladen</label>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, setVehicles)} className="w-full border p-2 rounded" />
              {!!vehicles.length && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {vehicles.map((f, i) => (
                    <img key={i} src={URL.createObjectURL(f)} alt="Fahrzeug" className="h-20 w-20 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full">Bewerbung absenden</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function ThankYouScreen({ onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-300 p-6">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl p-6 text-center">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">Vielen Dank für deine Bewerbung! 🎉</h2>
          <p className="text-gray-700">Wir werden deine Bewerbung prüfen und uns bald bei dir melden.</p>
          <Button onClick={onBack}>Zurück zur Startseite</Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminPanel({ items, onDecision, onBack }) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin: Bewerbungen</h1>
          <Button variant="secondary" onClick={onBack}>Zur Startseite</Button>
        </div>
        {items.length === 0 ? (
          <p className="text-gray-600">Noch keine Bewerbungen vorhanden.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((app) => (
              <Card key={app.id} className="shadow-lg rounded-2xl">
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{app.name}</h2>
                      <p className="text-sm text-gray-500">Discord: {app.discord}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      app.status === "angenommen" ? "bg-green-200 text-green-800" :
                      app.status === "abgelehnt" ? "bg-red-200 text-red-800" :
                      "bg-yellow-200 text-yellow-800"}`}>{app.status}</span>
                  </div>
                  <p className="italic">{app.reason}</p>
                  {!!app.builds?.length && (
                    <div>
                      <h3 className="font-semibold mb-2">Bauwerke:</h3>
                      <div className="flex gap-2 overflow-x-auto">
                        {app.builds.map((src, i) => (
                          <img key={i} src={src} alt="Bauwerk" className="h-24 w-24 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                  {!!app.vehicles?.length && (
                    <div>
                      <h3 className="font-semibold mb-2">Fahrzeuge:</h3>
                      <div className="flex gap-2 overflow-x-auto">
                        {app.vehicles.map((src, i) => (
                          <img key={i} src={src} alt="Fahrzeug" className="h-24 w-24 object-cover rounded" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 justify-end">
                    <Button variant="destructive" onClick={() => onDecision(app.id, "abgelehnt")}>Ablehnen</Button>
                    <Button onClick={() => onDecision(app.id, "angenommen")}>Annehmen</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("start");
  const [user, setUser] = useState({ discord: "", minecraft: "" });
  const [applications, setApplications] = useState([]);

  const go = (next, payload = {}) => {
    if (next === "apply") {
      setUser(payload);
      setView("apply");
    } else if (next === "admin") {
      setView("admin");
    } else if (next === "thankyou") {
      setView("thankyou");
    } else {
      setView("start");
    }
  };

  const addApplication = (app) => {
    setApplications((prev) => [app, ...prev]);
    setView("thankyou");
  };

  const decide = (id, status) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  };

  if (view === "start") return <StartPage onProceed={go} />;
  if (view === "apply") return <ApplicationForm initialData={user} onSubmitted={addApplication} />;
  if (view === "thankyou") return <ThankYouScreen onBack={() => go("start")} />;
  if (view === "admin") return <AdminPanel items={applications} onDecision={decide} onBack={() => go("start")} />;
  return null;
}
