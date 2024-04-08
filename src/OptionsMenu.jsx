import './OptionsMenu.css'
import optionsLogo from './assets/optionsPageLogo.png'
import {playToggleClick} from './Sounds'
import {handleControls} from './ControlMenu'

const OptionsMenu = ({onSelectOption}) => {
    return (
        <>
            <img id="optionsLogo" src={optionsLogo}/>
            <div id="optionTabs">
                    <input type="radio" id="vocabOptions" name="optionTabs" defaultChecked />
                    <label id="vocabTitle" for="vocabOptions">Vocab</label>
                    <div class="tab">
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Fruits</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabFruits">
                                    <input type="checkbox" class="vocab" id="vocabFruits" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Vegetables</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabVegetables">
                                    <input type="checkbox" class="vocab" id="vocabVegetables" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                            <div class="col2">
                                <h2 class="category">Animals</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAnimals">
                                    <input type="checkbox" class="vocab" id="vocabAnimals" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>      

                            <div class="col2">
                                <h2 class="category">Sports</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSports">
                                    <input type="checkbox" class="vocab" id="vocabSports" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                             <div class="col2">
                                <h2 class="category">Stationery</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabStationery">
                                    <input type="checkbox" class="vocab" id="vocabStationery" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>    

                             <div class="col2">
                                <h2 class="category" id="schoolRoomsTitle">School Rooms</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSchoolRooms">
                                    <input type="checkbox" class="vocab" id="vocabSchoolRooms" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>    

                             <div class="col2">
                                <h2 class="category">Locations</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabLocations">
                                    <input type="checkbox" class="vocab" id="vocabLocations" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>    
                        </div>

                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Occupations</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabOccupations">
                                    <input type="checkbox" class="vocab" id="vocabOccupations" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Subjects</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSubjects">
                                <input type="checkbox" class="vocab" id="vocabSubjects" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>    

                            <div class="col2">
                                <h2 class="category" id="monthsSeasonsTitle">Months & Seasons</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabMonthsSeasons">
                                <input type="checkbox" class="vocab" id="vocabMonthsSeasons" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Events</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabEvents">
                                <input type="checkbox" class="vocab" id="vocabEvents" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Daily Life</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabDailyLife">
                                <input type="checkbox" class="vocab" id="vocabDailyLife" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Verbs</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabVerbs">
                                <input type="checkbox" class="vocab" id="vocabVerbs" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Activities</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabActivities">
                                <input type="checkbox" class="vocab" id="vocabActivities" onClick={playToggleClick}/>
                                    <div class="slider round"></div>
                                </label>
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
            <div id="iconMenu">
                {handleControls('btnReturn', onSelectOption)}
            </div>
        </>
    )
}

export default OptionsMenu