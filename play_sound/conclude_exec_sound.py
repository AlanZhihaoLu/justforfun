from playsound import playsound
import time
import threading
import logging

class load_music:
    def __init__(self, song, bpm, end_func, stagger_beats=2):
        self.song = song
        self.bpm = bpm
        if not end_func:
            self.beats2end_func(int(input('How many beats into the song? Answer: ')))
        else:
            self.end_func = end_func
        self.stagger_beats = stagger_beats
        self.success_messages = ['YOU DID IT',
                                 'YOUR CODE RUNS PERFECTLY',
                                 'AN UTTERLY FLAWLESS VICTORY',
                                 'WOW',
                                 'NARY AN ERROR IN SIGHT',
                                 'INCREDIBLE',
                                 'ONLY YOU COULD HAVE DONE IT',
                                 'IN FACT',
                                 'NO ONE WILL EVER BE AS GOOD AS YOU',
                                 'THE BARDS ACROSS THE LANDS SING OF YOUR GLORIOUS VICTORIES',
                                 'YOU ARE A VERITABLE MASTER OF THE CODE',
                                 'I AM IN AWE OF YOU',
                                 'TRULY AMAZING',
                                 'YOU DID THE IMPOSSIBLE',
                                 'YOU CAN DO ANYTHING',
                                 'AND THE WORLD IS YOUR OYSTER',
                                 'NOW GET YOURSELF A COOKIE OR SOMETHING',
                                 'YOU DESERVE IT']
        self.fail_messages = ['SO BAD NEWS',
                              'IT DIDN\'T WORK',
                              'YOUR CODE, I MEAN',
                              'PROBABLY A SMALL BUG',
                              'BUT DON\'T WORRY',
                              'IT HAPPENS TO THE BEST OF US',
                              'IN FACT',
                              'YOU STILL GOT THIS',
                              'YOU CAN DO IT',
                              'BECAUSE YOU\'RE THE SMARTEST PERSON I KNOW',
                              'YUP',
                              'FOR SURE',
                              '',
                              'ANYWAYS',
                              'I FIGURED YOU MIGHT WANT TO SEE THE ERROR MESSAGE',
                              'SO UH',
                              'HERE YOU GO']
    def __repr__(self):
        return f'load_music(song={self.song},bpm={self.bpm},end_func={self.end_func},stagger_beats={self.stagger_beats})\n.success_messages={self.success_messages}\n.fail_messages={self.fail_messages}'
    def beats2end_func(self,beats):
        self.end_func = beats*(60/self.bpm)
        print(f'Hype starts at {self.end_func} seconds.')
    def cue_song(self):
        threading.Thread(target=playsound, args=(self.song,), daemon=True).start()
    def stagger_message(self, message, sleeptime):
        print(message)
        time.sleep(sleeptime)
    def hit_it(self,func,*args,**kwargs):
        logger = logging.getLogger()
        stagger_time = self.stagger_beats * (60/self.bpm)
        t0 = time.perf_counter()
        self.cue_song()
        try:
            output = func(*args, **kwargs)
        except Exception as e:
            time.sleep(self.end_func - (time.perf_counter() - t0))
            for i in range(len(self.fail_messages)):
                if not self.fail_messages[i]:
                    time.sleep(stagger_time)
                else:
                    self.stagger_message(self.fail_messages[i], stagger_time)
            logger.exception(e, exc_info=True)
        else:
            time.sleep(self.end_func - (time.perf_counter() - t0))
            for i in range(len(self.success_messages)):
                if not self.success_messages[i]:
                    time.sleep(stagger_time)
                self.stagger_message(self.success_messages[i], stagger_time)
            return output
    def wrap_it(self,func,*args,**kwargs):
        def wrapper(*args, **kwargs):
            self.hit_it(func,*args,**kwargs)
        return wrapper
    # For testing/demo purposes
    def oneplusone(self, trip_error=False):
        if trip_error:
            raise ValueError
        else:
            return 2
    
if __name__ == "__main__":
    print('This ain\'t meant to be run like that, yo. Import it as a module.')