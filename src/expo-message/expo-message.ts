import Expo, { ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import { IReturnObj } from "../dto/interface/common.if";
import { ErrCode } from "../utils/enumError";

export class ExpoMessage {
    private expo:Expo;
    constructor(accessToken = process.env.EXPO_ACCESS_TOKEN) {
        this.expo = new Expo({
            accessToken: accessToken,  //process.env.EXPO_ACCESS_TOKEN,
            useFcmV1: true,
        })
    }
    async sendMessages(tokens:string[], msg:string){
        const rtn:IReturnObj = {}
        const isTokenGood = tokens.every((token) => {
            if (!Expo.isExpoPushToken(token)) {
                console.error(`Push token ${token} is not a valid Expo push token`);
                return false;
            }
        });
        if (isTokenGood) {
            let messagees:ExpoPushMessage[] = [];
            messagees.push({
                to: tokens,
                // sound: 'default',
                body: msg,
                // data: { withSome: 'data' },
                // richContent: {
                //     image: 'https://example.com/statics/some-image-here-if-you-want.jpg'
                // },
            });
            let chunks = this.expo.chunkPushNotifications(messagees);

            let tickets:ExpoPushTicket[] = [];
            for (let chunk of chunks) {
                console.log('chunk:', chunk);
                let ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                console.log('ticketChunk:', ticketChunk);
                tickets.push(...ticketChunk);
            }

            let receiptIds:string[] =[];
            for (let ticket of tickets) {
                console.log('ticket:', ticket);
                if(ticket.status === 'ok') {
                    receiptIds.push(ticket.id);
                }   
            }
            if (receiptIds.length > 0) {
                let receiptIdChunks = this.expo.chunkPushNotificationReceiptIds(receiptIds);
                for (let chunk of receiptIdChunks) {
                    try {
                        console.log('chunkPushNotificationReceiptIds:', chunk);
                        let receipts = await this.expo.getPushNotificationReceiptsAsync(chunk);
                        for (let receiptId in receipts) {
                            console.log('receipt:', receipts[receiptId], receiptId);
                            let { status, message, details } = receipts[receiptId] as any;
                            if (status === 'ok') {
                                continue;
                            } else if (status === 'error'){
                                console.error('receiptId error:', message);
                                if (details && details.error) {
                                    console.error('receiptId details error:', details.error);
                                }
                            }
                        }
                    } catch (error) {
                        console.log('chunkPushNotificationReceiptIds error:', error);
                        rtn.error = ErrCode.UNEXPECTED_ERROR_ARISE;
                        rtn.extra = error.message;
                        return rtn;
                    }
                }
            }
        } else {
            rtn.error = ErrCode.PUSH_TOKEN_ERROR;
        }
        return rtn;
    }
}
