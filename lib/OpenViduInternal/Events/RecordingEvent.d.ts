import { Event } from "./Event";
import { Session } from "../../OpenVidu/Session";
/**
 * Defines the following events:
 * - `recordingStarted`: dispatched by [[Session]] after the session has started being recorded
 * - `recordingStopped`: dispatched by [[Session]] after the session has stopped being recorded
 */
export declare class RecordingEvent extends Event {
    /**
     * The recording ID generated in openvidu-server
     */
    id: string;
    /**
     * The recording name you supplied to openvidu-server. For example, to name your recording file MY_RECORDING:
     * - With **API REST**: POST to `/api/recordings/start` passing JSON body `{"session":"sessionId","name":"MY_RECORDING"}`
     * - With **openvidu-java-client**: `OpenVidu.startRecording(sessionId, "MY_RECORDING")` or `OpenVidu.startRecording(sessionId, new RecordingProperties.Builder().name("MY_RECORDING").build())`
     * - With **openvidu-node-client**: `OpenVidu.startRecording(sessionId, "MY_RECORDING")` or `OpenVidu.startRecording(sessionId, {name: "MY_RECORDING"})`
     *
     * If no name is supplied, this property will be undefined and the recorded file will be named after property [[id]]
     */
    name?: string;
    /**
     * For 'recordingStopped' event:
     * - "recordingStoppedByServer": the recording has been gracefully stopped by the application
     * - "sessionClosedByServer": the Session has been closed by the application
     * - "automaticStop": see [Automatic stop of recordings](/en/stable/advanced-features/recording/#automatic-stop-of-recordings)
     * - "mediaServerDisconnect": OpenVidu Media Node has crashed or lost its connection. A new Media Node instance is active and the recording has been stopped (no media streams are available in the new Media Node)
     *
     * For 'recordingStarted' empty string
     */
    reason?: string;
    /**
     * @hidden
     */
    constructor(target: Session, type: string, id: string, name: string, reason?: string);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
