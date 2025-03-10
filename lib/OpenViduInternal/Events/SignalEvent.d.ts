import { Event } from "./Event";
import { Connection } from "../../OpenVidu/Connection";
import { Session } from "../../OpenVidu/Session";
/**
 * Defines the following events:
 * - `signal`: dispatched by [[Session]] when a signal is received
 * - `signal:TYPE`: dispatched by [[Session]] when a signal of type TYPE is received
 */
export declare class SignalEvent extends Event {
    /**
     * The type of signal. It is string `"signal"` for those signals sent with no [[SignalOptions.type]] property, and `"signal:type"` if was sent with a
     * valid [[SignalOptions.type]] property.
     *
     * The client must be specifically subscribed to `Session.on('signal:type', function(signalEvent) {...})` to trigger that type of signal.
     *
     * Subscribing to `Session.on('signal', function(signalEvent) {...})` will trigger all signals, no matter their type.
     */
    type: string;
    /**
     * The message of the signal (can be empty)
     */
    data?: string;
    /**
     * The client that sent the signal. This property is undefined if the signal
     * was directly generated by the application server (not by other client)
     */
    from?: Connection;
    /**
     * @hidden
     */
    constructor(target: Session, type: string, data?: string, from?: Connection);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
