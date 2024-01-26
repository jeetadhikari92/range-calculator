export class WheelObserver {
    constructor(...elementIds) {
        this.wheelElements = elementIds.map((id) => document.getElementById(id));
    }

    update(model) {
        this.wheelElements.forEach(wheelElement => {
            wheelElement.style.animationDuration = `${70 / model.currentParams.speed * .9}s`
            wheelElement.style.scale = model.currentParams.wheelsize === 19 ? 1 : 1.05
        })
    }
}