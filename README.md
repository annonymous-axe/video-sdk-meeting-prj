# Getting Started with VideoSDK

This is task project for VideoSDK.

## First Method

#### First I try myself to switch person from Room A to Room B.

Steps :

- Called leave() method from useMeeting() hook to leave meeting from Room A.
- And join a new Room B.

But this is not the right method. Because it send close signal to tracks even if we are seeing LED light is on. From this, encoders are
refresh, which can be time and resource consuming.

## Second Method

### Second I look in useMeeting() hook.

In useMeeting hook, I see a prop onSwitchMeeting(). Then I search a default method for switching meeting and use it. It close the meeting not tracks because it using a layer architectures of videoSDK.

Steps :

- Give another control in Control components. Which handle switching meeting by asking a meeting ID.
- Call switchTo() method with meetingId and authToken as props.