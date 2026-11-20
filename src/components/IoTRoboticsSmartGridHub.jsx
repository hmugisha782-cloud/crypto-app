import { useState } from "react";

const IOT_SYSTEMS = [
  { name: "🏠 Kigali Smart Home AI Security, Locks & Solar Control", feeUsd: 24, tag: "Smart Living IoT" },
  { name: "🌱 Gatsibo Precision Soil Moisture & Auto-Irrigation Sensor", feeUsd: 18, tag: "Agri-IoT Telemetry" },
  { name: "🦾 Warehouse Autonomous Robotics & Drone Fleet Control", feeUsd: 110, tag: "Industrial Automation" },
  { name: "📶 6G Ultra-Low-Latency Edge Mesh Gateway Node", feeUsd: 45, tag: "Next-Gen Telecom" },
];

export default function IoTRoboticsSmartGridHub({ rates = {}, theme, panel }) {
  const [iot, setIot] = useState(IOT_SYSTEMS[0]);
  const [deviceId, setDeviceId] = useState("IOT-RW-884021 · Active");
  const [iotMsg, setIotMsg] = useState("");

  const rwfRate = Number(rates?.RWF || 1480);

  function activateIotDevice(e) {
    e.preventDefault();
    const token = "KGT-IOT-" + Math.floor(100000 + Math.random() * 900000);
    setIotMsg(`📡 IOT & ROBOTICS ONLINE [${token}]: "${iot.name}" synced to ${deviceId} · Paid $${iot.feeUsd} USD (${Math.round(iot.feeUsd * rwfRate).toLocaleString()} RWF)!`);
  }

  return (
    <section id="iot-robotics-hub" style={{ ...panel, marginBottom: 20, borderTop: "4px solid #06b6d4", display: "grid", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 17 }}>📡 Global IoT Smart Home, Industrial Robotics & Precision Farm Sensors (20B+ Modules)</h2>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: theme.muted }}>
            Control smart home security, automated farm irrigation, warehouse drones & 6G mesh nodes in RWF or USDT.
          </p>
        </div>
        <span style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(6,182,212,0.18)", color: "#22d3ee", fontWeight: 800, fontSize: 11 }}>
          20,000,000,000+ Active Modules
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
        {IOT_SYSTEMS.map((s) => (
          <button
            key={s.name}
            type="button"
            onClick={() => setIot(s)}
            style={{
              textAlign: "left",
              padding: 10,
              borderRadius: 10,
              border: `1px solid ${iot.name === s.name ? "#06b6d4" : theme.border}`,
              background: iot.name === s.name ? "rgba(6,182,212,0.18)" : theme.input,
              color: theme.text,
              cursor: "pointer",
              display: "grid",
              gap: 3,
            }}
          >
            <strong style={{ fontSize: 12 }}>{s.name}</strong>
            <span style={{ fontSize: 11, color: "#22d3ee", fontWeight: 800 }}>${s.feeUsd} USD ({Math.round(s.feeUsd * rwfRate).toLocaleString()} RWF)</span>
            <span style={{ fontSize: 10, color: theme.muted }}>{s.tag}</span>
          </button>
        ))}
      </div>

      <form onSubmit={activateIotDevice} style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <input type="text" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} placeholder="Device MAC / Sensor ID / Node Name" style={{ flex: 2, minWidth: 200, padding: "8px 10px", borderRadius: 8, border: `1px solid ${theme.border}`, background: theme.input, color: theme.text, fontSize: 12 }} />
        <button type="submit" style={{ padding: "8px 15px", borderRadius: 8, border: "none", background: "#06b6d4", color: "#02131d", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
          📡 Sync & Activate Device ({Math.round(iot.feeUsd * rwfRate).toLocaleString()} RWF)
        </button>
      </form>

      {iotMsg && <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(16,185,129,0.18)", border: "1px solid #10b981", color: "#10b981", fontSize: 12, fontWeight: 800 }}>{iotMsg}</div>}
    </section>
  );
}
