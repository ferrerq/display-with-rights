import { Directive, ElementRef, HostListener, Input, AfterViewInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Directive({
    selector: '[appRight]',

})

export class UserRigthDirective implements AfterViewInit {
    @Input() rights: string;
    private msg: string;
    constructor(private el: ElementRef) {
    }


    // Here we hide the element if the user has no rights on it
    ngAfterViewInit() {
        if (!this.hasRight()) {
            this.el.nativeElement.style.opacity = '0.2';
        }
    }

    // Here we disbaled the element if the user has no rights on it
    @HostListener('mouseenter') onMouseEnter() {
        this.msg = this.el.nativeElement.innerHTML;
        if (this.hasRight()) {
            this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML +
            '<br/><span style="transform: rotate(-50deg);position: absolute; margin-left:-50px;margin-top:-15px; font-size:18px; text-shadow: 2px 2px black">APPROVED</span>';
        } else {
            this.el.nativeElement.innerHTML = this.el.nativeElement.innerHTML +
            '<br/><span style="transform: rotate(-50deg);position: absolute; margin-left:-50px;margin-top:-15px;font-size:18px; text-shadow: 2px 2px black">DENIED</span>';
            this.el.nativeElement.disabled = true;
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.el.nativeElement.disabled = false;
        this.el.nativeElement.innerHTML = this.msg;
        this.el.nativeElement.style.animation = '';

    }

    private hasRight(): boolean {
        let returnedValue = false;
        (this.rights.split(',')).forEach(element => {
            if (element === this.getUserRigths()) {
                returnedValue = true;
            }
        });
        return returnedValue;
    }


    private getUserRigths(): string {
        return isNullOrUndefined(localStorage.getItem('QF_userRight')) ? 'NOTHING' : localStorage.getItem('QF_userRight');
    }

}
