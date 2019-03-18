import {BaseComponent} from '../shared/component/base-component';
import {$, ElementFinder} from 'protractor';

export class TooltipPo extends BaseComponent {
    tooltipEmailPattern: ElementFinder = $('[ng-show*="authForm.email.$error.pattern"] .tooltip-text');
    tooltipEmailRequired: ElementFinder = $('[ng-show*="authForm.email.$error.required"] .tooltip-text');
    tooltipPasswordRequired: ElementFinder = $(' [ng-show*="authForm.password.$error.required"] .tooltip-text');
}