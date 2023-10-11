import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MyMoney() {
  return (
    <Tabs defaultValue="deposit" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="deposit">Deposit</TabsTrigger>
        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="deposit">Deposit</TabsContent>
      <TabsContent value="withdraw">Withdraw</TabsContent>
    </Tabs>
  );
}
