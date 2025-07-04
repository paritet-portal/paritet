import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { UserRegisteredEvent } from '@paritet/shared-types';

@Injectable()
export class KafkaService implements OnModuleInit {
    constructor(@Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka) { }

    async onModuleInit() {
        await this.kafkaClient.connect();
    }

    emitUserRegistered(payload: UserRegisteredEvent) {
        this.kafkaClient.emit('user_registered', JSON.stringify(payload));
    }
}