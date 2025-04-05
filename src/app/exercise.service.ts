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
    this.apiService.get('user/activeSessions').subscribe( (apiResponses: any) => {
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
  nextExercise(currentExerciseID: number, currentExerciseResultData: any) {
    //@ts-ignore
    const sessionInfo = JSON.parse(localStorage.getItem('SessionInfo'));
    //@ts-ignore
    var exerciseInfo = JSON.parse(localStorage.getItem('ExerciseInfo'));
  
    // Add the result of the current exercise to the ExerciseInfo
    exerciseInfo.push(currentExerciseResultData);
    localStorage.setItem('ExerciseInfo', JSON.stringify(exerciseInfo));
  
    // Find the current exercise index based on the currentExerciseID and the length of exerciseInfo
    const currentExerciseIndex = exerciseInfo.length - 1;
  
    // Find the next exercise index by searching for the next occurrence of the currentExerciseID after the current index
    let nextExerciseIndex = -1;
    for (let i = currentExerciseIndex + 1; i < sessionInfo.exercises.length; i++) {
      if (sessionInfo.exercises[i].id === currentExerciseID) {
        nextExerciseIndex = i;
        break;
      }
    }
  
    // If no next exercise with the same ID is found, move to the next exercise in the list
    if (nextExerciseIndex === -1) {
      nextExerciseIndex = currentExerciseIndex + 1;
    }
  
    // Check if there are more exercises to complete
    if (nextExerciseIndex < sessionInfo.exercises.length) {
      if (sessionInfo.exercises[nextExerciseIndex].id === currentExerciseID) {
        window.location.reload();
      } else {
        this.router.navigate(['/esercizio/' + sessionInfo.exercises[nextExerciseIndex].id]);
      }
    } else {
      // Communicate with the backend and tell them that the session is over and the results are ready
      this.apiService.post('user/endSession', { sessionID: sessionInfo._id, results: exerciseInfo }).subscribe((apiResponse: any) => {
        console.log(apiResponse);
      });
      localStorage.removeItem('SessionInfo');
      localStorage.removeItem('ExerciseInfo');
      this.router.navigate(['/risultati']);
    }
  }
}
