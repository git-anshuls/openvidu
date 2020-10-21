import { Event } from "./Event";
import { Session } from "../../OpenVidu/Session";
/**
 * Defines event `networkQualityChangedEvent` dispatched by [[Session]].
 * This event is fired when the network quality of the local connection changes
 */
export declare class NetworkQualityChangedEvent extends Event {
    /**
     * Cause of the change on the neteotk quality event
     */
    reason: NetworkQualityChangedReason;
    /**
     * New value of the property (after change, current value)
     */
    newValue: Object;
    /**
     * Previous value of the property (before change)
     */
    oldValue: Object;
    /**
     * @hidden
     */
    constructor(target: Session, newValue: Object, oldValue: Object, reason: NetworkQualityChangedReason);
    /**
     * @hidden
     */
    callDefaultBehavior(): void;
}
export declare enum NetworkQualityChangedReason {
    ABOVE_MAX = "above_max",
    BELOW_MIN = "below_min"
}
