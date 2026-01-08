'use client';

import { motion } from 'motion/react';
import '../styles/shipping-cycle.css';

const nodeVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: { opacity: 1, scale: 1 },
};

const nodeTransition = {
	duration: 0.6,
	ease: [0.23, 1, 0.32, 1] as const,
};

// Pentagon node positions (center at 100,100, radius 55)
const nodes = [
	{ id: 'think', label: 'Think', x: 100, y: 45 },
	{ id: 'share', label: 'Share', x: 152, y: 83 },
	{ id: 'build', label: 'Build', x: 132, y: 145 },
	{ id: 'ship', label: 'Ship', x: 68, y: 145 },
	{ id: 'learn', label: 'Learn', x: 48, y: 83 },
];

// Paths connecting nodes (subtle curves)
const paths = [
	'M 100 45 Q 135 50 152 83',
	'M 152 83 Q 155 115 132 145',
	'M 132 145 Q 100 160 68 145',
	'M 68 145 Q 45 115 48 83',
	'M 48 83 Q 65 50 100 45',
];

export default function ShippingCycle() {
	return (
		<div className="shipping-cycle-container">
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 200 200"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					{/* Subtle gradient for light trails */}
					<radialGradient id="trail-gradient" fx="0.5" fy="0.5">
						<stop offset="0%" stopColor="var(--text-muted, #888)" stopOpacity="0.6" />
						<stop offset="50%" stopColor="var(--text-muted, #888)" stopOpacity="0.2" />
						<stop offset="100%" stopColor="transparent" />
					</radialGradient>

					{/* Masks for each path */}
					{paths.map((path, i) => (
						<mask id={`cycle-mask-${i + 1}`} key={`mask-${i}`}>
							<path d={path} strokeWidth="6" stroke="white" fill="none" />
						</mask>
					))}
				</defs>

				{/* Subtle center ring */}
				<motion.circle
					cx="100"
					cy="100"
					r="18"
					fill="none"
					stroke="var(--text-muted, #888)"
					strokeWidth="0.5"
					strokeOpacity="0.15"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 1.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
				/>

				{/* Connection paths - very subtle */}
				<g fill="none" strokeWidth="0.5" style={{ stroke: 'var(--text-muted, #888)' }}>
					{paths.map((path, i) => (
						<motion.path
							key={`path-${i}`}
							d={path}
							strokeOpacity="0.2"
							strokeDasharray="200"
							pathLength="200"
							initial={{ strokeDashoffset: 200, opacity: 0 }}
							animate={{ strokeDashoffset: 0, opacity: 1 }}
							transition={{
								strokeDashoffset: {
									duration: 1.2,
									delay: 0.3 + i * 0.1,
									ease: [0.23, 1, 0.32, 1],
								},
								opacity: { duration: 0.4, delay: 0.3 + i * 0.1 },
							}}
						/>
					))}
				</g>

				{/* Light trails - subtle glow */}
				{paths.map((_, i) => (
					<g mask={`url(#cycle-mask-${i + 1})`} key={`trail-${i}`}>
						<circle
							className={`cycle-trail cycle-trail-${i + 1}`}
							cx="0"
							cy="0"
							r="8"
							fill="url(#trail-gradient)"
						/>
					</g>
				))}

				{/* Nodes - minimal numbered circles */}
				{nodes.map((node, i) => (
					<g key={node.id} className="cycle-node">
						<g transform={`translate(${node.x}, ${node.y})`}>
							{/* Circle outline */}
							<motion.circle
								r="10"
								fill="var(--bg, #F5F5F5)"
								stroke="var(--text-muted, #888)"
								strokeWidth="0.5"
								strokeOpacity="0.4"
								variants={nodeVariants}
								initial="hidden"
								animate="visible"
								transition={{ ...nodeTransition, delay: 0.1 + i * 0.08 }}
							/>
							{/* Step number */}
							<motion.text
								textAnchor="middle"
								dy="0.35em"
								fontSize="6"
								fill="var(--text-muted, #888)"
								fillOpacity="0.6"
								fontWeight="500"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
							>
								{i + 1}
							</motion.text>
						</g>

						{/* Node label */}
						<motion.text
							x={node.x}
							y={node.y + 18}
							textAnchor="middle"
							fontSize="5.5"
							fill="var(--text-muted, #888)"
							fillOpacity="0.7"
							fontWeight="400"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
						>
							{node.label}
						</motion.text>
					</g>
				))}

				{/* Direction indicators - small dots instead of arrows */}
				{nodes.map((node, i) => {
					const nextNode = nodes[(i + 1) % nodes.length];
					const midX = (node.x + nextNode.x) / 2;
					const midY = (node.y + nextNode.y) / 2;
					const offsetX = (100 - midX) * 0.08;
					const offsetY = (100 - midY) * 0.08;

					return (
						<g key={`dot-${i}`} transform={`translate(${midX + offsetX}, ${midY + offsetY})`}>
							<motion.circle
								r="1.5"
								fill="var(--text-muted, #888)"
								fillOpacity="0.4"
								initial={{ opacity: 0, scale: 0 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 1.0 + i * 0.08, duration: 0.4 }}
							/>
						</g>
					);
				})}
			</svg>

			<style>{`
				.shipping-cycle-container {
					width: 100%;
					aspect-ratio: 1;
					max-width: 300px;
					margin: 2rem auto;
				}

				@media (max-width: 480px) {
					.shipping-cycle-container {
						max-width: 260px;
					}
				}
			`}</style>
		</div>
	);
}
