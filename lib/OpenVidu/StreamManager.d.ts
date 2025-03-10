import { Stream } from "./Stream";
import { EventDispatcher } from "./EventDispatcher";
import { StreamManagerVideo } from "../OpenViduInternal/Interfaces/Public/StreamManagerVideo";
import { Event } from "../OpenViduInternal/Events/Event";
import { VideoInsertMode } from "../OpenViduInternal/Enums/VideoInsertMode";
/**
 * Interface in charge of displaying the media streams in the HTML DOM. This wraps any [[Publisher]] and [[Subscriber]] object.
 * You can insert as many video players fo the same Stream as you want by calling [[StreamManager.addVideoElement]] or
 * [[StreamManager.createVideoElement]].
 * The use of StreamManager wrapper is particularly useful when you don't need to differentiate between Publisher or Subscriber streams or just
 * want to directly manage your own video elements (even more than one video element per Stream). This scenario is pretty common in
 * declarative, MVC frontend frameworks such as Angular, React or Vue.js
 *
 * ### Available event listeners (and events dispatched)
 *
 * - videoElementCreated ([[VideoElementEvent]])
 * - videoElementDestroyed ([[VideoElementEvent]])
 * - streamPlaying ([[StreamManagerEvent]])
 * - streamAudioVolumeChange ([[StreamManagerEvent]])
 *
 */
export declare class StreamManager extends EventDispatcher {
    /**
     * The Stream represented in the DOM by the Publisher/Subscriber
     */
    stream: Stream;
    /**
     * All the videos displaying the Stream of this Publisher/Subscriber
     */
    videos: StreamManagerVideo[];
    /**
     * Whether the Stream represented in the DOM is local or remote
     * - `false` for [[Publisher]]
     * - `true` for [[Subscriber]]
     */
    remote: boolean;
    /**
     * The DOM HTMLElement assigned as target element when creating the video for the Publisher/Subscriber. This property is only defined if:
     * - [[Publisher]] has been initialized by calling method [[OpenVidu.initPublisher]] with a valid `targetElement` parameter
     * - [[Subscriber]] has been initialized by calling method [[Session.subscribe]] with a valid `targetElement` parameter
     */
    targetElement: HTMLElement;
    /**
     * `id` attribute of the DOM video element displaying the Publisher/Subscriber's stream. This property is only defined if:
     * - [[Publisher]] has been initialized by calling method [[OpenVidu.initPublisher]] with a valid `targetElement` parameter
     * - [[Subscriber]] has been initialized by calling method [[Session.subscribe]] with a valid `targetElement` parameter
     */
    id: string;
    /**
     * @hidden
     */
    firstVideoElement: StreamManagerVideo;
    /**
     * @hidden
     */
    lazyLaunchVideoElementCreatedEvent: boolean;
    /**
     * @hidden
     */
    element: HTMLElement;
    /**
     * @hidden
     */
    protected canPlayListener: EventListener;
    /**
     * @hidden
     */
    constructor(stream: Stream, targetElement?: HTMLElement | string);
    /**
     * See [[EventDispatcher.on]]
     */
    on(type: string, handler: (event: Event) => void): EventDispatcher;
    /**
     * See [[EventDispatcher.once]]
     */
    once(type: string, handler: (event: Event) => void): StreamManager;
    /**
     * See [[EventDispatcher.off]]
     */
    off(type: string, handler?: (event: Event) => void): StreamManager;
    /**
     * Makes `video` element parameter display this [[stream]]. This is useful when you are
     * [managing the video elements on your own](/en/stable/cheatsheet/manage-videos/#you-take-care-of-the-video-players)
     *
     * Calling this method with a video already added to other Publisher/Subscriber will cause the video element to be
     * disassociated from that previous Publisher/Subscriber and to be associated to this one.
     *
     * @returns 1 if the video wasn't associated to any other Publisher/Subscriber and has been successfully added to this one.
     * 0 if the video was already added to this Publisher/Subscriber. -1 if the video was previously associated to any other
     * Publisher/Subscriber and has been successfully disassociated from that one and properly added to this one.
     */
    addVideoElement(video: HTMLVideoElement): number;
    /**
     * Creates a new video element displaying this [[stream]]. This allows you to have multiple video elements displaying the same media stream.
     *
     * #### Events dispatched
     *
     * The Publisher/Subscriber object will dispatch a `videoElementCreated` event once the HTML video element has been added to DOM. See [[VideoElementEvent]]
     *
     * @param targetElement HTML DOM element (or its `id` attribute) in which the video element of the Publisher/Subscriber will be inserted
     * @param insertMode How the video element will be inserted accordingly to `targetElemet`
     *
     * @returns The created HTMLVideoElement
     */
    createVideoElement(targetElement?: string | HTMLElement, insertMode?: VideoInsertMode): HTMLVideoElement;
    /**
     * Updates the current configuration for the [[PublisherSpeakingEvent]] feature and the [StreamManagerEvent.streamAudioVolumeChange](/en/stable/api/openvidu-browser/classes/streammanagerevent.html) feature for this specific
     * StreamManager audio stream, overriding the global options set with [[OpenVidu.setAdvancedConfiguration]]. This way you can customize the audio events options
     * for each specific StreamManager and change them dynamically.
     *
     * @param publisherSpeakingEventsOptions New options to be applied to this StreamManager's audio stream. It is an object which includes the following optional properties:
     * - `interval`: (number) how frequently the analyser polls the audio stream to check if speaking has started/stopped or audio volume has changed. Default **100** (ms)
     * - `threshold`: (number) the volume at which _publisherStartSpeaking_, _publisherStopSpeaking_ events will be fired. Default **-50** (dB)
     */
    updatePublisherSpeakingEventsOptions(publisherSpeakingEventsOptions: any): void;
    /**
     * @hidden
     */
    initializeVideoProperties(video: HTMLVideoElement): void;
    /**
     * @hidden
     */
    removeAllVideos(): void;
    /**
     * @hidden
     */
    disassociateVideo(video: HTMLVideoElement): boolean;
    /**
     * @hidden
     */
    addPlayEventToFirstVideo(): void;
    /**
     * @hidden
     */
    updateMediaStream(mediaStream: MediaStream): void;
    /**
     * @hidden
     */
    emitEvent(type: string, eventArray: any[]): void;
    /**
     * @hidden
     */
    createVideo(): HTMLVideoElement;
    /**
     * @hidden
     */
    removeSrcObject(streamManagerVideo: StreamManagerVideo): void;
    protected pushNewStreamManagerVideo(streamManagerVideo: StreamManagerVideo): void;
    private mirrorVideo;
    private removeMirrorVideo;
}
