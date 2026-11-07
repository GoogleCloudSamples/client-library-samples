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

// [START cloudtrace_v2_traceservice_span_create]

import (
	"context"
	"fmt"
	"io"
	"time"

	cloudtrace "cloud.google.com/go/trace/apiv2"
	tracepb "cloud.google.com/go/trace/apiv2/tracepb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

// Use the CreateSpan method.
func createSpan(ctx context.Context, w io.Writer, projectID string, traceID string, spanID string) error {
	name := fmt.Sprintf("projects/%s/traces/%s/spans/%s", projectID, traceID, spanID)
	now := time.Now()
	startTime := timestamppb.New(now)
	endTime := timestamppb.New(now.Add(100 * time.Millisecond))
	displayName := &tracepb.TruncatableString{
		Value: "example-operation",
	}

	client, err := cloudtrace.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &tracepb.Span{
		Name:        name,
		SpanId:      spanID,
		DisplayName: displayName,
		StartTime:   startTime,
		EndTime:     endTime,
	}

	span, err := client.CreateSpan(ctx, req)
	if err != nil {
		return fmt.Errorf("CreateSpan failed: %w", err)
	}

	fmt.Fprintf(w, "Created span: %s\n", span.GetName())
	return nil
}

// [END cloudtrace_v2_traceservice_span_create]
