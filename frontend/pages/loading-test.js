import LoadingAnimation from '../components/LoadingAnimation';

export default function LoadingTest() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-8">Loading Animation Test</h1>
      <LoadingAnimation />
    </div>
  );
}
