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

// [START bigquerystorage_v1beta2_bigquerywrite_append_rows]

import (
	"context"
	"fmt"
	"io"

	bigquerystorage "cloud.google.com/go/bigquery/storage/apiv1beta2"
	storagepb "cloud.google.com/go/bigquery/storage/apiv1beta2/storagepb"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/types/descriptorpb"
)

// appendRows appends serialized record data to the default BigQuery write stream.
func appendRows(ctx context.Context, w io.Writer, projectID string, datasetID string, tableID string) error {
	writeStream := fmt.Sprintf("projects/%s/datasets/%s/tables/%s/_default", projectID, datasetID, tableID)

	descriptorProto := &descriptorpb.DescriptorProto{
		Name: proto.String("SampleRecord"),
		Field: []*descriptorpb.FieldDescriptorProto{
			{
				Name:   proto.String("customer_name"),
				Number: proto.Int32(1),
				Type:   descriptorpb.FieldDescriptorProto_TYPE_STRING.Enum(),
				Label:  descriptorpb.FieldDescriptorProto_LABEL_OPTIONAL.Enum(),
			},
		},
	}

	protoRows := &storagepb.AppendRowsRequest_ProtoData{
		WriterSchema: &storagepb.ProtoSchema{
			ProtoDescriptor: descriptorProto,
		},
		Rows: &storagepb.ProtoRows{
			SerializedRows: [][]byte{
				[]byte("\n\x08Jane Doe"),
			},
		},
	}

	client, err := bigquerystorage.NewBigQueryWriteClient(ctx)
	if err != nil {
		return fmt.Errorf("NewBigQueryWriteClient failed: %w", err)
	}
	defer client.Close()

	stream, err := client.AppendRows(ctx)
	if err != nil {
		return fmt.Errorf("client.AppendRows failed: %w", err)
	}

	req := &storagepb.AppendRowsRequest{
		WriteStream: writeStream,
		Rows: &storagepb.AppendRowsRequest_ProtoRows{
			ProtoRows: protoRows,
		},
	}

	if err := stream.Send(req); err != nil {
		return fmt.Errorf("stream.Send failed: %w", err)
	}
	if err := stream.CloseSend(); err != nil {
		return fmt.Errorf("stream.CloseSend failed: %w", err)
	}

	resp, err := stream.Recv()
	if err != nil {
		return fmt.Errorf("stream.Recv failed: %w", err)
	}

	if errStatus := resp.GetError(); errStatus != nil {
		return fmt.Errorf("append rows response error: %s", errStatus.GetMessage())
	}

	fmt.Fprintf(w, "Appended rows to %s successfully\n", writeStream)

	return nil
}

// [END bigquerystorage_v1beta2_bigquerywrite_append_rows]
