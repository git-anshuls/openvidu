/*
 * (C) Copyright 2017-2020 OpenVidu (https://openvidu.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { Event } from "./Event";
import { Connection } from "../../OpenVidu/Connection";
import { Session } from "../../OpenVidu/Session";

/**
 * Defines the following events:
 * - `signal`: dispatched by [[Session]] when a signal is received
 * - `signal:TYPE`: dispatched by [[Session]] when a signal of type TYPE is received
 */
export class SignalEvent extends Event {
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
  constructor(target: Session, type: string, data?: string, from?: Connection) {
    super(false, target, "signal");
    if (!!type) {
      this.type = "signal:" + type;
    }
    this.data = data;
    this.from = from;
  }

  /**
   * @hidden
   */
  // tslint:disable-next-line:no-empty
  callDefaultBehavior() {}
}
