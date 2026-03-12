/**
 * host.jsx — ExtendScript for Cut Before Markers extension
 * Called from index.html via cs.evalScript('cutBeforeMarkers(seconds)')
 */

function cutBeforeMarkers(secondsBefore) {
    var TICKS_PER_SECOND = 254016000000;

    try {
        var seq = app.project.activeSequence;
        if (!seq) return JSON.stringify({ success: false, error: 'No active sequence. Open a sequence and try again.' });

        // Detect frame rate
        var fps = 24;
        try {
            var tpf = parseInt(seq.timebase, 10);
            if (tpf > 0) fps = Math.round(TICKS_PER_SECOND / tpf * 100) / 100;
        } catch (e) {}

        function pad(n) { return n < 10 ? '0' + n : '' + n; }
        function secsToTC(s) {
            s = parseFloat(s) || 0;
            var h  = Math.floor(s / 3600);
            var m  = Math.floor((s % 3600) / 60);
            var sc = Math.floor(s % 60);
            var f  = Math.round((s - Math.floor(s)) * fps);
            if (f >= fps) f = Math.floor(fps) - 1;
            return pad(h) + ':' + pad(m) + ':' + pad(sc) + ':' + pad(f);
        }

        // Collect markers
        var markers    = seq.markers;
        var numMarkers = markers.numMarkers;
        if (numMarkers === 0) return JSON.stringify({ success: false, error: 'No markers on the active sequence.' });

        var markerTimes = [];
        var mk = markers.getFirstMarker();
        markerTimes.push(parseFloat(mk.start.seconds));
        for (var i = 1; i < numMarkers; i++) {
            mk = markers.getNextMarker(mk);
            markerTimes.push(parseFloat(mk.start.seconds));
        }

        // QE DOM razor
        app.enableQE();
        var qeSeq = qe.project.getActiveSequence();
        if (!qeSeq) return JSON.stringify({ success: false, error: 'Could not access QE sequence. Restart Premiere and try again.' });

        var cuts = [], skipped = [];
        for (var j = 0; j < markerTimes.length; j++) {
            var ct = markerTimes[j] - secondsBefore;
            if (ct <= 0) { skipped.push(markerTimes[j].toFixed(1)); continue; }
            qeSeq.razor(secsToTC(ct));
            cuts.push(markerTimes[j].toFixed(1));
        }

        return JSON.stringify({
            success:  true,
            markers:  numMarkers,
            cuts:     cuts.length,
            skipped:  skipped.length,
            cutAt:    cuts,
            skippedAt: skipped,
            fps:      fps
        });

    } catch (e) {
        return JSON.stringify({ success: false, error: e.toString() });
    }
}
