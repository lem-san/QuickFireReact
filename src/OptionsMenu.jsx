import './OptionsMenu.css'
import optionsLogo from './assets/optionsPageLogo.png'

function OptionsMenu() {
    return (
        <>
            <img id="optionsLogo" src={optionsLogo}/>
            <div id="optionTabs">
                    <input type="radio" id="vocabOptions" name="optionTabs" checked="checked"/>
                    <label id="vocabTitle" for="vocabOptions">Vocab</label>
                    <div class="tab">
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Fruit</h2>
                            </div>
                            <div class="col2">
                                <input type="checkbox" class="vocab" id="vocabFruit"/>
                            </div>

                            <div class="col2">
                                <h2 class="category">Vegetable</h2>
                            </div>
                            <div class="col2">
                                <input type="checkbox" class="vocab" id="vocabVegetable"/>
                            </div>    
                        </div>
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Fruit</h2>
                            </div>
                            <div class="col2">
                                <input type="checkbox" class="vocab" id="vocabFruit"/>
                            </div>

                            <div class="col2">
                                <h2 class="category">Vegetable</h2>
                            </div>
                            <div class="col2">
                                <input type="checkbox" class="vocab" id="vocabVegetable"/>
                            </div>    
                        </div>
                    </div>

                    <input type="radio" id="modifierOptions" name="optionTabs"/>
                    <label id="modifierTitle" for="modifierOptions">Modifiers</label>
                    <div class="tab">
                        <p>This is a Modifier test.</p>
                        <p>This is predominantly a teaching tool. It requires someone familiar with the intended vocabulary to indicate whether the answers given are correct or not. It's recommended that a teacher facilitates the activity, pressing the correct/incorrect buttons.
                        There will be future updates to include a 'solo-play' mode, allowing students to play without the need of teacher assistance. Stay tuned!</p>
                    </div>
            </div>
        </>
    )
}

export default OptionsMenu