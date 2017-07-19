import { StockManagementSystemPage } from './app.po';

describe('stock-management-system App', function() {
  let page: StockManagementSystemPage;

  beforeEach(() => {
    page = new StockManagementSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
