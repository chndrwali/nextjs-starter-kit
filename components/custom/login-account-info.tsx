import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

export const LoginAccountInfo = () => {
  return (
    <Alert className="mb-4 bg-primary/10 border-primary/20 text-primary max-w-lg w-full mx-auto">
      <Info className="h-4 w-4" />
      <AlertDescription className="ml-2 text-sm">
        <p className="font-medium mb-1">
          To see dashboard/admin please use this account:
        </p>
        <ul className="list-disc list-inside opacity-90">
          <li>
            <strong>Email:</strong> admin@gmail.com
          </li>
          <li>
            <strong>Password:</strong> !Admin1234
          </li>
        </ul>
      </AlertDescription>
    </Alert>
  );
};
