import * as PouchDB from 'pouchdb';
import { PouchConnectionReq } from './msgs/pouch-connection-req';
import { MsgBus } from './msg-bus';
import { PouchConnectionRes } from './msgs/pouch-connection-res';

export class PouchConnectionPoolProcessor {

  private readonly pouchDbs: Map<string, PouchConnectionRes>;
  // private readonly writeActions: Map<string, FragmentWriteReq[]>;

  public static create(msgBus: MsgBus): PouchConnectionPoolProcessor {
    return new PouchConnectionPoolProcessor(msgBus);
  }

  private constructor(msgBus: MsgBus) {
    this.pouchDbs = new Map<string, PouchConnectionRes>();

    msgBus.subscribe(msg => {
      PouchConnectionReq.is(msg).match(pcr => {
        let c = this.pouchDbs.get(pcr.config.path);
        if (!c) {
          const pouchDb = new PouchDB(pcr.config.path, pcr.config.dbConfig);
          c = new PouchConnectionRes({
              tid: '',
              config: pcr.config,
              pouchDb: pouchDb
            });
          this.pouchDbs.set(pcr.config.path, c);
        }
        msgBus.next(new PouchConnectionRes({
          tid: pcr.tid,
          config: c.config,
          pouchDb: c.pouchDb
        }));
      });
    });
  }

}