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

  startSession(sessionId: string) {
    //clear the local storage SessionInfo and ExerciseInfo
    localStorage.removeItem('SessionInfo');
    localStorage.removeItem('ExerciseInfo');
    //right here will go and api call to start the session
    this.apiService.get('activeSessions').subscribe( (apiResponses: any) => {
      console.log(apiResponses);
      console.log(sessionId);
    //find the session with the id that was passed
    const apiResponse = apiResponses.find( (session:any) => session._id === sessionId );
    console.log(apiResponse);
    //store the session info in local storage
    localStorage.setItem('SessionInfo', JSON.stringify(apiResponse));
    localStorage.setItem('ExerciseInfo', JSON.stringify([]));
    //navigate to the first exercise (will be the first in the array) /esercizio/103
    this.router.navigate(['/esercizio/' + apiResponse.exercises[0].id]);
  });
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
      //communicate with the backend and tell them that the session is over and the results are ready
      this.apiService.post('endSession', { sessionID: sessionInfo._id, results: exerciseInfo }).subscribe( (apiResponse: any) => {
        console.log(apiResponse);
      });
      localStorage.removeItem('SessionInfo');
      localStorage.removeItem('ExerciseInfo');
      this.router.navigate(['/risultati']);
    }
  } 
}
