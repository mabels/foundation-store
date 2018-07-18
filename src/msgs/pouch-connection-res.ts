import { Msg } from '../types/msg';
import { Match } from '../types/match';
import { PouchConfigObj } from '../types/pouch-config';

export interface PouchConnectionResInit {
  readonly tid: string;
  readonly created?: Date;
  readonly config: PouchConfigObj;
  readonly pouchDb: PouchDB.Database;
}

export class PouchConnectionRes extends Msg implements PouchConnectionResInit {
  public readonly created: Date = new Date();
  public readonly config: PouchConfigObj;
  public readonly pouchDb: PouchDB.Database;

  public static is(msg: any): Match<PouchConnectionRes> {
    if (msg instanceof PouchConnectionRes) {
      // console.log(`Match:FeedDone`, msg);
      return Match.create<PouchConnectionRes>(msg);
    }
    return Match.nothing();
  }

  constructor(pcri: PouchConnectionResInit) {
    super(pcri.tid);
    this.created = this.created || (new Date());
    this.config = pcri.config;
    this.pouchDb = pcri.pouchDb;
  }

}