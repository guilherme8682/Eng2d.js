import { Engine } from "./Engine/Engine";
import { Visible } from "./Engine/Components/Visible";
import { Point } from "./Engine/Screen/references";
import { Color } from "./Engine/utilitys";
import { Component } from "./Engine/Components/Component";
import { Tag } from "./Engine/Event/TagEvent";
import { Shooter } from "./Engine/Components/Players/Shooter";
const { deadline, solid } = Tag

export default () => {
    let e = new Engine()
    //Scene 1#
    let c1 = new Visible(new Point(0,0), new Point(3000,3000), new Color('PaleTurquoise'))
    c1.fixed = true
    let p1 = new Shooter(new Point(500,-200), new Point(50,100), new Color('red'), e, 1),
        l1: Component[] = [
            p1,
            new Component(new Point(-10000,1000), new Point(20000,100)).addTag(deadline),
            new Visible(new Point(1200,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(1500,600), new Point(40,295), new Color('green')).addTag(solid),
            new Visible(new Point(0,200), new Point(300,50), new Color('RoyalBlue')).addTag(solid),
            new Visible(new Point(300,350), new Point(300,50), new Color('Salmon')).addTag(solid),
            new Visible(new Point(-200,400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid),
        ]

    for(let i = -10; i < 10; i += 2)
        l1.push(new Visible(new Point(i * 500,850), new Point(750,0.1*600), new Color('Peru')).addTag(solid))
    for(let i = 1; i < 5; ++i){
        l1.push(new Visible(new Point(0,200 - i*400), new Point(300,50), new Color('RoyalBlue')).addTag(solid))
        l1.push(new Visible(new Point(300,350 - i*400), new Point(300,50), new Color('Salmon')).addTag(solid))
        l1.push(new Visible(new Point(-200,400 - i*400), new Point(300,50), new Color('PaleVioletRed')).addTag(solid))
    }

    e.currentScene.collection.addComponent(c1, 0)
    e.currentScene.collection.addComponents(l1, 1)
    e.currentScene.setScreenTarget(p1)

    //Scene 2#
    e.createScene('GameOver')
    e.setCurrentScene('GameOver')

    let t1 = new Visible(new Point(0,0), new Point(3000,3000), new Color('pink'))
    let l2 = new Visible(new Point(200,200), new Point(500,100), new Color('white'))

    t1.fixed = true


    e.currentScene.collection.addComponents([t1, l2],0)

    //--------------
    e.setCurrentScene('default')
    e.run()

    p1.events.add([deadline],(components: Component[]) => {
        for(let component of components)
            if(p1.collidesWith(component))
                e.setCurrentScene('GameOver')
    })

}