import {BaseComponent} from '../shared/component/base-component';
import {$, ElementFinder} from 'protractor';

export class NotificationPo extends BaseComponent {
    notificationMessage: ElementFinder = $('.noty_message');
}