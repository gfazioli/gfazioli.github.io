import { HomePage } from "@/components/HomePage";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default function Page() {
  const dict = getDictionary("it");
  return <HomePage lang="it" dict={dict} />;
}
