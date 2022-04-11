import {DynamicModule, Module, Provider } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {PaymentsController } from './payments.controller'
import Stripe from 'stripe';
@Module({
  imports: [],
  controllers: [ PaymentsController],
  providers: [PaymentsService],
})
export class PaymentModule {
    //using dynamic module 
    
    static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {

        const stripe = new Stripe(apiKey, config);

        const stripeProvider:Provider = {
            provide: 'STRIPE_PROVIDER',
            useValue: stripe
        }; 
        return {
            module: PaymentModule,
            providers: [PaymentsService,stripeProvider],
            exports: [PaymentsService,stripeProvider],
            global: true
        };
    }
}
