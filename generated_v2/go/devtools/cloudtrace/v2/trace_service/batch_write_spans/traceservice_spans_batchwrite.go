// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START cloudtrace_v2_traceservice_batch_write_spans]

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
	"time"

	cloudtrace "cloud.google.com/go/trace/apiv2"
	tracepb "cloud.google.com/go/trace/apiv2/tracepb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// batchWriteSpans creates and sends spans to Cloud Trace.
func batchWriteSpans(ctx context.Context, w io.Writer, projectID string) error {
	client, err := cloudtrace.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	traceIDBytes := make([]byte, 16)
	if _, err := rand.Read(traceIDBytes); err != nil {
		return fmt.Errorf("rand.Read trace ID: %w", err)
	}
	traceID := hex.EncodeToString(traceIDBytes)

	spanIDBytes := make([]byte, 8)
	if _, err := rand.Read(spanIDBytes); err != nil {
		return fmt.Errorf("rand.Read span ID: %w", err)
	}
	spanID := hex.EncodeToString(spanIDBytes)

	startTime := timestamppb.Now()
	endTime := timestamppb.New(startTime.AsTime().Add(100 * time.Millisecond))

	name := fmt.Sprintf("projects/%s", projectID)
	spans := []*tracepb.Span{
		{
			Name: fmt.Sprintf("%s/traces/%s/spans/%s", name, traceID, spanID),
			SpanId: spanID,
			DisplayName: &tracepb.TruncatableString{
				Value: "example-operation",
			},
			StartTime: startTime,
			EndTime:   endTime,
		},
	}

	req := &tracepb.BatchWriteSpansRequest{
		Name:  name,
		Spans: spans,
	}

	if err := client.BatchWriteSpans(ctx, req); err != nil {
		return fmt.Errorf("BatchWriteSpans: %w", err)
	}

	fmt.Fprintf(w, "Wrote span %s to trace %s\n", spanID, traceID)
	return nil
}

// [END cloudtrace_v2_traceservice_batch_write_spans]
