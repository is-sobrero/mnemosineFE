import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private router: Router,
    private apiService: ApiService
  ) { }

  startSession() {
    //clear the local storage SessionInfo and ExerciseInfo
    localStorage.removeItem('SessionInfo');
    localStorage.removeItem('ExerciseInfo');
    //right here will go and api call to start the session
    const apiResponse = {
      sessionID: '1234',
      assignedBy: 'John Doe',
      exercises: [
        {
          id: 103,
          difficulty: 1,
        },
        {
          id: 104,
          difficulty: 1,
        },
        {
          id: 105,
          difficulty: 1,
        },
        {
          id: 108,
          difficulty: 2,
        },
        {
          id: 109,
          difficulty: 1,
        },
        {
          id: 110,
          difficulty: 1,
        },
        {
          id: 201,
          difficulty: 1,
        },
        {
          id: 202,
          difficulty: 1,
        },
        {
          id: 203,
          difficulty: 1,
        },
        {
          id: 204,
          difficulty: 2,
        },
        {
          id: 303,
          difficulty: 1,
        },
      ]
    }
    //store the session info in local storage
    localStorage.setItem('SessionInfo', JSON.stringify(apiResponse));
    localStorage.setItem('ExerciseInfo', JSON.stringify([]));
    //navigate to the first exercise (will be the first in the array) /esercizio/103
    this.router.navigate(['/esercizio/' + apiResponse.exercises[0].id]);
  }

  currentInfo() {
    //find current exercise
    //@ts-ignore
    const sessionInfo = JSON.parse(localStorage.getItem('SessionInfo'));
    //@ts-ignore
    const exerciseInfo = JSON.parse(localStorage.getItem('ExerciseInfo'));
    const currentExerciseIndex = exerciseInfo.length;
    const currentExerciseID = sessionInfo.exercises[currentExerciseIndex].id;
    const currentExerciseObject = sessionInfo.exercises[currentExerciseIndex];
    return currentExerciseObject;
  }
  nextExercise( currentExerciseID: number, currentExerciseResultData: any ) {
    //@ts-ignore
    const sessionInfo = JSON.parse(localStorage.getItem('SessionInfo'));
    //add the result of the current exercise to the ExerciseInfo
    //@ts-ignore  
    var exerciseInfo = JSON.parse(localStorage.getItem('ExerciseInfo'));
    exerciseInfo.push(currentExerciseResultData);
    localStorage.setItem('ExerciseInfo', JSON.stringify(exerciseInfo));
    //find the next exercise in the sessionInfo
    const nextExerciseIndex = sessionInfo.exercises.findIndex( (exercise:any) => exercise.id === currentExerciseID ) + 1;
    //if there is a next exercise navigate to it
    if( nextExerciseIndex < sessionInfo.exercises.length ) {
      this.router.navigate(['/esercizio/' + sessionInfo.exercises[nextExerciseIndex].id]);
    } else {
      //if there are no more exercises in the session navigate to the results page
      localStorage.removeItem('SessionInfo');
      localStorage.removeItem('ExerciseInfo');
      this.router.navigate(['/risultati']);
    }
  } 
}
