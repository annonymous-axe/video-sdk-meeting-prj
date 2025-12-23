import React, { useEffect, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  VideoPlayer,
} from "@videosdk.live/react-sdk";
import { Video, VideoOff, Mic, MicOff, LogOut, Users, Copy, Check, ArrowRight, RefreshCw } from "lucide-react";
import { createMeeting, authToken } from "./API";

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '24px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '48px',
        maxWidth: '480px',
        width: '100%'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 8px 16px rgba(102, 126, 234, 0.4)'
          }}>
            <Video color="white" size={40} />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1a202c',
            marginBottom: '8px'
          }}>
            Video Conference
          </h1>
          <p style={{ color: '#718096', fontSize: '16px' }}>
            Connect with your team instantly
          </p>
        </div>

        {/* Input Section */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            display: 'block',
            color: '#4a5568',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>
            Meeting ID
          </label>
          <input
            type="text"
            placeholder="Enter Meeting Id"
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && onClick()}
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* Buttons Container */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={onClick}
            style={{
              flex: 1,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 24px rgba(102, 126, 234, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Join
          </button>

          <span style={{ color: '#a0aec0', fontSize: '14px', fontWeight: '600' }}>
            or
          </span>

          <button
            onClick={onClick}
            style={{
              flex: 1,
              background: 'white',
              color: '#667eea',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              border: '2px solid #667eea',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#f7fafc';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'white';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Create Meeting
          </button>
        </div>
      </div>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState(null);

  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  const participantCount = participants ? participants.size : 0;

  if (joined === "JOINING") {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '6px solid rgba(255,255,255,0.3)',
            borderTop: '6px solid white',
            borderRadius: '50%',
            margin: '0 auto 24px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: 'white', fontSize: '20px', fontWeight: '600' }}>
            Joining the meeting...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!joined) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <button
          onClick={joinMeeting}
          style={{
            background: 'white',
            color: '#667eea',
            padding: '20px 48px',
            borderRadius: '16px',
            fontSize: '20px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <header style={{
        background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
        borderBottom: '2px solid #533483',
        padding: '20px 32px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h3 style={{
              color: 'white',
              fontSize: '20px',
              fontWeight: 'bold',
              margin: 0
            }}>
              Meeting Id: {props.meetingId}
            </h3>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        flex: 1,
        overflow: 'auto',
        padding: '32px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <Controls />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}>
            {[...participants.keys()].map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(
    props.participantId
  );

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
      borderRadius: '20px',
      overflow: 'hidden',
      border: '2px solid #533483',
      padding: '16px'
    }}>
      <p style={{
        color: 'white',
        fontSize: '14px',
        marginBottom: '12px',
        fontWeight: '600'
      }}>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          <VideoPlayer
            participantId={props.participantId}
            type="video"
            containerStyle={{
              height: "300px",
              width: "300px",
            }}
            className="h-full"
            classNameVideo="h-full"
            videoStyle={{}}
          />
        </div>
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam, switchTo } = useMeeting();

  const switchRoom = () => {
    const newMeetingId = document.getElementById("newMeetingId").value;
    switchTo({ meetingId: newMeetingId, token: authToken });
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)',
      padding: '24px',
      borderRadius: '20px',
      border: '2px solid #533483',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
    }}>
      {/* Main Controls Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => leave()}
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #f56565 0%, #c53030 100%)',
            color: 'white'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <LogOut size={18} />
          Leave
        </button>

        <button
          onClick={() => toggleMic()}
          style={{
            ...buttonStyle,
            background: 'rgba(72, 187, 120, 0.2)',
            color: '#48bb78',
            border: '2px solid #48bb78'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <Mic size={18} />
          toggleMic
        </button>

        <button
          onClick={() => toggleWebcam()}
          style={{
            ...buttonStyle,
            background: 'rgba(102, 126, 234, 0.2)',
            color: '#667eea',
            border: '2px solid #667eea'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <Video size={18} />
          toggleWebcam
        </button>
      </div>

      {/* Switch Room Section */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <input
          type="text"
          placeholder="Enter next meeting/room id"
          id="newMeetingId"
          style={{
            flex: '1',
            minWidth: '250px',
            padding: '12px 16px',
            border: '2px solid #533483',
            borderRadius: '12px',
            fontSize: '14px',
            outline: 'none',
            background: 'rgba(255,255,255,0.05)',
            color: 'white',
            transition: 'all 0.3s'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.background = 'rgba(255,255,255,0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#533483';
            e.target.style.background = 'rgba(255,255,255,0.05)';
          }}
        />
        <button
          onClick={() => switchRoom()}
          style={{
            ...buttonStyle,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
        >
          <RefreshCw size={18} />
          Switch Room
        </button>
      </div>
    </div>
  );
}

function App() {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;