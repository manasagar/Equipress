"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Clock,
  FileText,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  type: "submission" | "analysis" | "validation" | "reward" | "stake";
  timestamp: string;
  from: string;
  to: string;
  amount: number;
  status: "confirmed" | "pending";
  blockNumber: number;
  hash: string;
}

interface Block {
  number: number;
  hash: string;
  timestamp: string;
  transactions: number;
  validator: string;
  size: string;
}

export function BlockchainExplorer() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [activeTab, setActiveTab] = useState("transactions");

  useEffect(() => {
    // Simulate fetching data from blockchain
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock transactions data
      const mockTransactions: Transaction[] = [
        {
          id: "tx-1",
          type: "submission",
          timestamp: "2023-11-15 14:32:45",
          from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          to: "0x123...789",
          amount: 0,
          status: "confirmed",
          blockNumber: 12345678,
          hash: "0x8a37f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823218",
        },
        {
          id: "tx-2",
          type: "analysis",
          timestamp: "2023-11-15 14:30:12",
          from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          to: "0x456...012",
          amount: 0,
          status: "confirmed",
          blockNumber: 12345677,
          hash: "0x7b26f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823219",
        },
        {
          id: "tx-3",
          type: "validation",
          timestamp: "2023-11-15 14:28:05",
          from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          to: "0x789...345",
          amount: 0,
          status: "confirmed",
          blockNumber: 12345676,
          hash: "0x6c15f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823220",
        },
        {
          id: "tx-4",
          type: "reward",
          timestamp: "2023-11-15 14:25:30",
          from: "0x000...000",
          to: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          amount: 25,
          status: "confirmed",
          blockNumber: 12345675,
          hash: "0x5d04f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823221",
        },
        {
          id: "tx-5",
          type: "stake",
          timestamp: "2023-11-15 14:20:18",
          from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          to: "0x000...000",
          amount: 100,
          status: "confirmed",
          blockNumber: 12345674,
          hash: "0x4e93f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823222",
        },
      ];

      // Mock blocks data
      const mockBlocks: Block[] = [
        {
          number: 12345678,
          hash: "0x8a37f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823218",
          timestamp: "2023-11-15 14:32:45",
          transactions: 24,
          validator: "0xabc...def",
          size: "45.2 KB",
        },
        {
          number: 12345677,
          hash: "0x7b26f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823219",
          timestamp: "2023-11-15 14:30:12",
          transactions: 18,
          validator: "0xfed...cba",
          size: "38.7 KB",
        },
        {
          number: 12345676,
          hash: "0x6c15f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823220",
          timestamp: "2023-11-15 14:28:05",
          transactions: 32,
          validator: "0x123...456",
          size: "52.1 KB",
        },
        {
          number: 12345675,
          hash: "0x5d04f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823221",
          timestamp: "2023-11-15 14:25:30",
          transactions: 15,
          validator: "0x789...012",
          size: "31.5 KB",
        },
        {
          number: 12345674,
          hash: "0x4e93f1c41fcb96f99f382a974fc09c266ac4cdd48c2a3b29c4b51f7195823222",
          timestamp: "2023-11-15 14:20:18",
          transactions: 27,
          validator: "0xabc...def",
          size: "48.3 KB",
        },
      ];

      setTransactions(mockTransactions);
      setBlocks(mockBlocks);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "analysis":
        return <Search className="h-4 w-4 text-green-500" />;
      case "validation":
        return <CheckCircle className="h-4 w-4 text-purple-500" />;
      case "reward":
        return <Badge className="h-4 w-4 text-yellow-500" />;
      case "stake":
        return <Badge className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleSearch = () => {
    // In a real app, this would search the blockchain for the transaction or block
    console.log("Searching for:", searchQuery);
  };

  const truncateAddress = (address: string) => {
    if (address.includes("...")) return address;
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4
    )}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Blockchain Explorer
        </h2>
        <p className="text-muted-foreground">
          Explore transactions and blocks on the Equipress blockchain network
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search by transaction hash, block number, or address"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest activity on the Equipress network
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Hash</TableHead>
                      <TableHead>Block</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTransactionIcon(tx.type)}
                            <span className="capitalize">{tx.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {truncateAddress(tx.hash)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-4 w-4"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>{tx.blockNumber}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {truncateAddress(tx.from)}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center">
                            {truncateAddress(tx.to)}
                            <ArrowRight className="mx-1 h-3 w-3 text-muted-foreground" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {tx.amount > 0 ? `${tx.amount} ETH` : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{tx.timestamp.split(" ")[1]}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tx.status === "confirmed" ? "default" : "outline"
                            }
                            className="capitalize"
                          >
                            {tx.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="blocks">
          <Card>
            <CardHeader>
              <CardTitle>Recent Blocks</CardTitle>
              <CardDescription>
                Latest blocks added to the Equipress blockchain
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-4 w-[200px]" />
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Block</TableHead>
                      <TableHead>Hash</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Txs</TableHead>
                      <TableHead>Validator</TableHead>
                      <TableHead>Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {blocks.map((block) => (
                      <TableRow key={block.number}>
                        <TableCell>{block.number}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {truncateAddress(block.hash)}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-1 h-4 w-4"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>{block.timestamp.split(" ")[1]}</span>
                          </div>
                        </TableCell>
                        <TableCell>{block.transactions}</TableCell>
                        <TableCell className="font-mono text-xs">
                          {block.validator}
                        </TableCell>
                        <TableCell>{block.size}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
