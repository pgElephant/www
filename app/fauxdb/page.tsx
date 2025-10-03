import ProjectTemplate from '../_components/ProjectTemplate';

const fauxdbConfig = {
  hero: {
    title: <><b>fauxdb</b>: MongoDB wire-protocol database, Rust engine, PostgreSQL storage</>,
    subtitle: 'MongoDB wire protocol, Rust-powered, PostgreSQL storage',
    projectName: 'fauxdb',
  },
  badges: [
    'MongoDB Compatible',
    'Rust Engine',
    'PostgreSQL Storage',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* mongosh terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300">mongosh</span>
          </div>
          <pre className="whitespace-pre-line text-green-300">{`> db.users.insertOne({ name: "Alice", age: 27 })
{ acknowledged: true, insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8") }

> db.users.find({ age: { $gt: 20 } })
[
  { _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"), name: "Alice", age: 27 }
]

> db.stats()
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}</pre>
        </div>
        {/* fauxdb terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-cyan-300">fauxdb</span>
          </div>
          <pre className="whitespace-pre-line text-cyan-200">{`> fauxdb-cli insert users '{"name": "Alice", "age": 27}'
Inserted document with id 64f1c2e1a1b2c3d4e5f6a7b8

> fauxdb-cli find users '{"age": { "$gt": 20 }}'
[
  { _id: "64f1c2e1a1b2c3d4e5f6a7b8", name: "Alice", age: 27 }
]

> fauxdb-cli stats
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}</pre>
        </div>
        {/* postgresql terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-yellow-200">postgresql</span>
          </div>
          <pre className="whitespace-pre-line text-yellow-100">{`> psql -d fauxdb -c "SELECT * FROM users;"
id |  name  | age
----+--------+-----
 1  | Alice  | 27
(1 row)

> psql -d fauxdb -c "SELECT COUNT(*) FROM users;"
 count
-------
     1
(1 row)
`}</pre>
        </div>
      </div>
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Compatibility', desc: 'Full MongoDB wire protocol support for seamless migration.' },
      { title: 'Rust-Powered Engine', desc: 'High-performance, safe, and modern backend.' },
      { title: 'PostgreSQL Storage', desc: 'Reliable, battle-tested storage engine.' },
      { title: 'Advanced Features', desc: 'Transactions, geospatial, and more.' },
    ],
  },
  docsLinks: [
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
  ],
};

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}
import ProjectTemplate from '../_components/ProjectTemplate';

const fauxdbConfig = {
  hero: {
    title: <><b>fauxdb</b>: MongoDB wire-protocol database, Rust engine, PostgreSQL storage</>,
    subtitle: 'MongoDB wire protocol, Rust-powered, PostgreSQL storage',
    projectName: 'fauxdb',
  },
  badges: [
    'MongoDB Compatible',
    'Rust Engine',
    'PostgreSQL Storage',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* mongosh terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300">mongosh</span>
          </div>
          <pre className="whitespace-pre-line text-green-300">{`> db.users.insertOne({ name: "Alice", age: 27 })
{ acknowledged: true, insertedId: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8") }

> db.users.find({ age: { $gt: 20 } })
[
  { _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"), name: "Alice", age: 27 }
]

> db.stats()
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}</pre>
        </div>
        {/* fauxdb terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-cyan-300">fauxdb</span>
          </div>
          <pre className="whitespace-pre-line text-cyan-200">{`> fauxdb-cli insert users '{"name": "Alice", "age": 27}'
Inserted document with id 64f1c2e1a1b2c3d4e5f6a7b8

> fauxdb-cli find users '{"age": { "$gt": 20 }}'
[
  { _id: "64f1c2e1a1b2c3d4e5f6a7b8", name: "Alice", age: 27 }
]

> fauxdb-cli stats
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}</pre>
        </div>
        export default function FauxDbPage() {
          return <ProjectTemplate {...fauxdbConfig} />;
        }
        // REMOVE ALL CODE BELOW THIS LINE
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300">mongosh</span>
          </div>
          <pre className="whitespace-pre-line text-green-300">
{`> db.users.insertOne({ name: "Alice", age: 27 })

> db.users.find({ age: { $gt: 20 } })
[
  { _id: ObjectId("64f1c2e1a1b2c3d4e5f6a7b8"), name: "Alice", age: 27 }
]

> db.stats()
{ collections: 1, objects: 1, avgObjSize: 32, storageSize: 4096 }
`}
  </pre>
          </pre>
        </div>
        {/* fauxdb terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-cyan-300">fauxdb</span>
          </div>
          <pre className="whitespace-pre-line text-cyan-200">
{`> fauxdb-cli insert users '{"name": "Alice", "age": 27}'
      </div>
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Compatibility', desc: 'Full MongoDB wire protocol support for seamless migration.' },
      { title: 'Rust-Powered Engine', desc: 'High-performance, safe, and modern backend.' },
      { title: 'PostgreSQL Storage', desc: 'Reliable, battle-tested storage engine.' },
      { title: 'Advanced Features', desc: 'Transactions, geospatial, and more.' },
          </pre>
        </div>
        demo: (
          <div className="max-w-6xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* mongosh terminal */}
              <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
                <div className="flex items-center mb-3">
                  <div className="flex gap-1 mr-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">mongosh</span>
                </div>
                <pre className="whitespace-pre-line text-green-300">{`> db.users.insertOne({ name: "Alice", age: 27 })
          <td className="px-4 py-3 text-slate-300">Wire protocol, drivers, and tools compatibility.</td>
          <td className="px-4 py-3 text-slate-300">Seamless migration.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Rust Engine</td>
          <td className="px-4 py-3 text-slate-300">Modern, safe, and fast backend.</td>
          <td className="px-4 py-3 text-slate-300">High performance.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Storage</td>
              </div>
              {/* fauxdb terminal */}
              <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
                <div className="flex items-center mb-3">
                  <div className="flex gap-1 mr-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-cyan-300">fauxdb</span>
                </div>
                <pre className="whitespace-pre-line text-cyan-200">{`> fauxdb-cli insert users '{"name": "Alice", "age": 27}'
          <td className="px-4 py-3 text-slate-300">Battle-tested, reliable storage.</td>
          <td className="px-4 py-3 text-slate-300">Durability and reliability.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">ACID Transactions</td>
          <td className="px-4 py-3 text-slate-300">Multi-document ACID compliance.</td>
          <td className="px-4 py-3 text-slate-300">Data integrity.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Geospatial</td>
              </div>
              {/* postgresql terminal */}
              <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
                <div className="flex items-center mb-3">
                  <div className="flex gap-1 mr-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-yellow-200">postgresql</span>
                </div>
                <pre className="whitespace-pre-line text-yellow-100">{`> psql -d fauxdb -c "SELECT * FROM users;"
          <td className="px-4 py-3 text-slate-300">Advanced geospatial queries.</td>
        </tr>
      </tbody>
    </table>
  ),
  docsLinks: [
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
  ],
};
              </div>
            </div>
          </div>
        ),

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}
