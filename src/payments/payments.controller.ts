import { Controller, Get,Inject, UseGuards} from '@nestjs/common';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
    constructor(@Inject('STRIPE_PROVIDER') private readonly stripeProvider: stripe) { }
    @UseGuards(LocalAuthGuard)
    @Get('/')
    async getcustomers(): Promise<stripe.Response<stripe.ApiList<stripe.Customer>>> {
        return await this.stripeProvider.customers.list();
    }
}
