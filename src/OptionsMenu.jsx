import './OptionsMenu.css'
import React, {useState} from 'react'
import optionsLogo from './assets/optionsPageLogo.png'
import {playToggleClick} from './Sounds'
import {handleControls} from './ControlMenu'

const OptionsMenu = ({onSelectOption}) => {
    const [checkedVocab, setCheckedVocab] = useState([])
    const [timeLimit, setTimeLimit] = useState(60) // Default time limit
    const [questionType, setQuestionType] = useState(['Image', 'Repeat'])
    const [vocab, setVocab] = useState(null);

    const handleSelectedVocab = (event) => {
        playToggleClick()
        const category = event.target.id.replace('vocab', '');
        if (event.target.checked) {
            setCheckedVocab([...checkedVocab, category]);
        } else {
            setCheckedVocab(checkedVocab.filter((c) => c !== category));
        }
    }

    const handleTimeLimitChange = (event) => {
        playToggleClick()
        const selectedTimeLimit = parseInt(event.target.value);
        setTimeLimit(selectedTimeLimit);
    };

    const handleQuestionType = (event) => {
        playToggleClick()
        const selectedType = event.target.id.replace('question', '');
        if (event.target.checked) {
            setQuestionType([...questionType, selectedType]);
        } else {
            setQuestionType(questionType.filter((c) => c !== selectedType));
        }    
    };

    const handleNextButton = () => {
        playToggleClick()
        if (checkedVocab != "") {
            if (questionType != "") {
                onSelectOption('GameScreen', checkedVocab, 0, timeLimit, questionType)
            } else {
                alert("Please select a question type!")
            }
        } else if (questionType != ""){
            alert("Please select a category type!")
        } else {
            alert("Please select a category and question type!")
        }

    };

    return (
        <>
            <img id="optionsLogo" src={optionsLogo}/>
            <div id="optionTabs">
                    <input type="radio" id="vocabOptions" name="optionTabs" defaultChecked />
                    <label id="vocabTitle" for="vocabOptions">Vocab</label>
                    <div class="tab">
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Fruits 🍎</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabFruits">
                                    <input type="checkbox" class="vocab" id="vocabFruits" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Vegetables 🥕</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabVegetables">
                                    <input type="checkbox" class="vocab" id="vocabVegetables" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                            <div class="col2">
                                <h2 class="category" id="foodDrinkTitle">Food & Drink 🍔</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabFoodDrink">
                                    <input type="checkbox" class="vocab" id="vocabFoodDrink" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>    

                            <div class="col2">
                                <h2 class="category">Animals 🐶</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAnimals">
                                    <input type="checkbox" class="vocab" id="vocabAnimals" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>      

                            <div class="col2">
                                <h2 class="category">Sports ⚾</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSports">
                                    <input type="checkbox" class="vocab" id="vocabSports" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                             <div class="col2">
                                <h2 class="category">Stationery ✏️</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabStationery">
                                    <input type="checkbox" class="vocab" id="vocabStationery" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>    

                            <div class="col2">
                                <h2 class="category">School Rooms 🏫</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSchoolRooms">
                                <input type="checkbox" class="vocab" id="vocabSchoolRooms" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>  

                             <div class="col2">
                                <h2 class="category">Locations 📮</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabLocations">
                                    <input type="checkbox" class="vocab" id="vocabLocations" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                             <div class="col2">
                                <h2 class="category">Nature 🌳</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabNature">
                                    <input type="checkbox" class="vocab" id="vocabNature" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>      
                             

                            <div class="col2">
                                <h2 class="category">Months & Seasons 🌸</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabMonthsSeasons">
                                    <input type="checkbox" class="vocab" id="vocabMonthsSeasons" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                             <div class="col2">
                                <h2 class="category">Ordinal Numbers 📅</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabOrdinalNumbers">
                                    <input type="checkbox" class="vocab" id="vocabOrdinalNumbers" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                            <div class="col2">
                                <h2 class="category">Subjects 📚</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSubjects">
                                <input type="checkbox" class="vocab" id="vocabSubjects" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Daily Life 🛌</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabDailyLife">
                                    <input type="checkbox" class="vocab" id="vocabDailyLife" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                             </div>

                            <div class="col2">
                                <h2 class="category">People 🧑</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabPeople">
                                <input type="checkbox" class="vocab" id="vocabPeople" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Body Parts 👁️</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabBodyParts">
                                    <input type="checkbox" class="vocab" id="vocabBodyParts" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Objects 👜</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabObjects">
                                    <input type="checkbox" class="vocab" id="vocabObjects" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Tastes 🌶️</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabTastes">
                                    <input type="checkbox" class="vocab" id="vocabTastes" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>       
                            
                            <div class="col2">
                                <h2 class="category">Adjectives 💪</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAdjectives">
                                <input type="checkbox" class="vocab" id="vocabAdjectives" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>             
                        </div>

                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Occupations 👮‍♀️</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabOccupations">
                                    <input type="checkbox" class="vocab" id="vocabOccupations" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Colors 🎨</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabColors">
                                <input type="checkbox" class="vocab" id="vocabColors" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Numbers 🔢</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabNumbers">
                                <input type="checkbox" class="vocab" id="vocabNumbers" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Shapes 🟨</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabShapes">
                                <input type="checkbox" class="vocab" id="vocabShapes" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Alphabet (Uppercase) 🔠</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAlphabetUppercase">
                                <input type="checkbox" class="vocab" id="vocabAlphabetUppercase" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Alphabet (Lowercase) 🔡</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAlphabetLowercase">
                                <input type="checkbox" class="vocab" id="vocabAlphabetLowercase" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Countries 🌎</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabCountries">
                                <input type="checkbox" class="vocab" id="vocabCountries" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Feelings 😴</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabFeelings">
                                <input type="checkbox" class="vocab" id="vocabFeelings" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Weather 🌤️</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabWeather">
                                <input type="checkbox" class="vocab" id="vocabWeather" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Days & Times 🌃</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabDaysTimes">
                                <input type="checkbox" class="vocab" id="vocabDaysTimes" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Clothing 👕</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabClothing">
                                <input type="checkbox" class="vocab" id="vocabClothing" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 

                            <div class="col2">
                                <h2 class="category">Snacks & Desserts 🍨</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSnacksDesserts">
                                <input type="checkbox" class="vocab" id="vocabSnacksDesserts" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div> 
                            <div class="col2">
                                <h2 class="category">Verbs 💃</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabVerbs">
                                <input type="checkbox" class="vocab" id="vocabVerbs" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Hobbies & Activities 🎮</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabHobbiesActivities">
                                <input type="checkbox" class="vocab" id="vocabHobbiesActivities" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>                            

                            <div class="col2">
                                <h2 class="category">School Clubs 🎸</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSchoolClubs">
                                <input type="checkbox" class="vocab" id="vocabSchoolClubs" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>       

                            <div class="col2">
                                <h2 class="category">School Events 🏅</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabSchoolEvents">
                                <input type="checkbox" class="vocab" id="vocabSchoolEvents" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>

                            <div class="col2">
                                <h2 class="category">Annual Events 🎎</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="vocabAnnualEvents">
                                <input type="checkbox" class="vocab" id="vocabAnnualEvents" onClick={handleSelectedVocab}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <input type="radio" id="modifierOptions" name="optionTabs"/>
                    <label id="modifierTitle" for="modifierOptions">Modifiers</label>
                    <div class="tab">
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Question type:</h2>
                            </div>                            
                            <div class="col2">
                                <h2 class="category"></h2>
                            </div>
                            <div class="col2">
                                <h2 class="category">Image</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="questionImage">
                                    <input type="checkbox" class="vocab" id="questionImage" onClick={handleQuestionType} defaultChecked/>
                                    <div class="slider round"></div>
                                </label>
                            </div>
                            <div class="col2">
                                <h2 class="category">English</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="questionEnglish">
                                    <input type="checkbox" class="vocab" id="questionEnglish" onClick={handleQuestionType}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>
                            <div class="col2">
                                <h2 class="category">Japanese</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="questionJapanese">
                                    <input type="checkbox" class="vocab" id="questionJapanese" onClick={handleQuestionType}/>
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="col">
                            <div class="col2">
                                <h2 class="category">Time limit</h2>
                            </div>
                            <div class="col2">
                                <label class="switch">
                                    <select value={timeLimit} onChange={handleTimeLimitChange}>
                                        <option value="5">0:05</option>
                                        <option value="30">0:30</option>
                                        <option value="45">0:45</option>
                                        <option value="60">1:00</option>
                                        <option value="90">1:30</option>
                                        <option value="120">2:00</option>
                                    </select>
                                </label>
                            </div>
                            <div class="col2">
                                <h2 class="category">No repeats</h2>
                            </div>
                            <div class="col2">
                                <label class="switch" for="questionRepeat">
                                    <input type="checkbox" class="vocab" id="questionRepeat" onClick={handleQuestionType} defaultChecked/>
                                    <div class="slider round"></div>
                                </label>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="controls">
                {handleControls('btnMainMenu', onSelectOption)}
                {handleControls('btnFullscreen')}
                {handleControls('btnNext', handleNextButton)}
            </div>
        </>
    )
}

export default OptionsMenu