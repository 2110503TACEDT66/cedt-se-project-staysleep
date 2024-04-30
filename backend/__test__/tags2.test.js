import {getTags,createTags,deleteTags} from '../controllers/tags';

jest.mock('../models/Tags', ()=> ({
    findOne : jest.fn().mockReturnValue(null)
    ,create : jest.fn().mockReturnValue(1),
}));


describe("POST /api/v1/hotels/tags", () => {
    it('should return null', async () => {
        var req = {body : "test"};
        var res = null;
        try{
            res = await createTags(req)
        }
        catch(err){}
        expect(res).toEqual(null)
    });
  });
