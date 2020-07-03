const switchMap = rxjs.operators.switchMap;
const map = rxjs.operators.map;
const tap = rxjs.operators.tap;
const mergeMap = rxjs.operators.mergeMap;
const take = rxjs.operators.take;
const filter = rxjs.operators.filter;
const interval = rxjs.interval;
const catchError = rxjs.operators.catchError;
const fromEvent = rxjs.fromEvent;
const defer = rxjs.defer;
const of = rxjs.of;
const from = rxjs.from;
const Observable = rxjs.Observable;
const withLatestFrom = rxjs.operators.withLatestFrom;
const BehaviorSubject = rxjs.BehaviorSubject;
const Subject = rxjs.Subject;

/*
document.getElementById("btn").addEventListener("click", function(event) {
    console.log(event)
});

const kibocsato1 = fromEvent(document.getElementById("btn"), "click").pipe(
    map((click) => click.clientX),
    filter((clientX) => clientX > 55)
  );

const feliratkozas1 = kibocsato1.subscribe((payload) => {
  console.log(payload);
});

const feliratkozas2 = kibocsato1.subscribe((payload) => {
  alert(payload);
});
*/

// 1. példa
/*
const interval$ = interval(1000)
  .pipe(
    map((szam) => szam + ". másodpercnél tartunk"),
    take(5)
  )
  .subscribe((szam) => {
    console.log(szam);
  });
*/

// 2. példa
/*
const interval$ = interval(1000).pipe(
  map((szam) => szam + ". másodpercnél tartunk"),
  take(5)
);

fromEvent(document.getElementById("btn"), "click")
  .pipe(switchMap((click) => interval$))
  .subscribe((szam) => {
    console.log(szam);
  });
*/

// 3. példa

const fetchPosts = () =>
  // Promise<Array<Post>>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .catch(() => []);

const postsFetched$ = new Subject(); // Observable<Array<Post>>
fromEvent(document.getElementById("btn"), "click")
  .pipe(
    switchMap(() => defer(() => fetchPosts())),
    tap((adatASzerverről) => {
      postsFetched$.next(adatASzerverről);
    })
  )
  .subscribe();

// Observer 1
const subscription1 = postsFetched$
  .pipe(map((adat) => adat.length))
  .subscribe((adat) => {
    console.log("Observer 1, adat a szerverről:");
    console.log(adat);
  });

// Observer 2
const subscription2 = postsFetched$.subscribe((adat) => {
  console.log("Observer 2, adat a szerverről:");
  console.log(adat);
});
