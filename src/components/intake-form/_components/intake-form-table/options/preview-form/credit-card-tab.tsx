import { TabsContent } from '@/components/ui/tabs';

const CreditCardTab = ({ id }: { id: string }) => {
  return <TabsContent value="cc_info">{id}</TabsContent>;
};
export default CreditCardTab;
