import { Controller, Get,Inject} from '@nestjs/common';
import stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('STRIPE_PROVIDER') private readonly stripeProvider: stripe) { }

    @Get('/')
    async getcustomers() {
        return await this.stripeProvider.customers.list();
    }
}
