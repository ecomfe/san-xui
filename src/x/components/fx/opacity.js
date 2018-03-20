/**
 * @file san-xui/x/components/fx/opacity.js
 * @author leeight
 */

export function opacity(steps = 20, finValue = 1) {
    return {
        enter(el, done) {
            let currentStep = 0;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = finValue;
                    done();
                    return;
                }
                el.style.opacity = 1 / steps * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        },
        leave(el, done) {
            let currentStep = 0;

            function goStep() {
                if (currentStep >= steps) {
                    el.style.opacity = 0;
                    done();
                    return;
                }
                el.style.opacity = 1 - 1 / steps * currentStep++;
                requestAnimationFrame(goStep);
            }

            goStep();
        }
    };
}
